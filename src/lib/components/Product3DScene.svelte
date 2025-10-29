<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { ModelConfig, AnimationSetupFunction } from '$lib/types';
	import { SCENE_3D } from '$lib/constants';

	// Props
	interface Props {
		models?: ModelConfig[];
		animationSetup?: AnimationSetupFunction;
		cameraConfig?: {
			fov?: number;
			near?: number;
			far?: number;
			position?: { x: number; y: number; z: number };
		};
		modelGroupConfig?: {
			position?: { x: number; y: number; z: number };
			rotation?: { x: number; y: number; z: number };
			scale?: number;
		};
		lightConfig?: {
			directional?: {
				color?: number;
				intensity?: number;
				position?: { x: number; y: number; z: number };
			};
			ambient?: {
				color?: number;
				intensity?: number;
			};
		};
		onloaded?: () => void;
		onerror?: (error: unknown) => void;
	}
	
	let {
		models = [],
		animationSetup = undefined,
		cameraConfig = {},
		modelGroupConfig = {},
		lightConfig = {},
		onloaded,
		onerror
	}: Props = $props();

	gsap.registerPlugin(ScrollTrigger);

	// Canvas and rendering
	let canvasElement = $state<HTMLCanvasElement>();
	let renderer = $state<THREE.WebGLRenderer>();
	let scene = $state<THREE.Scene>();
	let camera = $state<THREE.PerspectiveCamera>();

	// 3D Models
	let loadedModels = $state<THREE.Object3D[]>([]);
	let modelGroup = $state<THREE.Group>();

	// Loading state
	let isLoading = $state(true);

	// Animation cleanup function
	let cleanupAnimations: (() => void) | void;

	// Merge configs with defaults from constants
	const finalCameraConfig = {
		...SCENE_3D.CAMERA,
		...cameraConfig,
		position: { ...SCENE_3D.CAMERA.POSITION, ...(cameraConfig.position || {}) }
	};
	const finalModelGroupConfig = {
		...SCENE_3D.MODEL_GROUP,
		...modelGroupConfig,
		position: { ...SCENE_3D.MODEL_GROUP.POSITION, ...(modelGroupConfig.position || {}) },
		rotation: { ...SCENE_3D.MODEL_GROUP.ROTATION, ...(modelGroupConfig.rotation || {}) }
	};
	const finalLightConfig = {
		directional: {
			...SCENE_3D.LIGHTING.DIRECTIONAL,
			...(lightConfig.directional || {}),
			position: { ...SCENE_3D.LIGHTING.DIRECTIONAL.POSITION, ...(lightConfig.directional?.position || {}) }
		},
		ambient: { ...SCENE_3D.LIGHTING.AMBIENT, ...(lightConfig.ambient || {}) }
	};

	onMount(() => {
		if (!canvasElement) return;
		
		initializeScene();
		loadModels();
		startAnimationLoop();
		setupEventListeners();

		return cleanup;
	});

	onDestroy(() => {
		cleanup();
	});

	function initializeScene(): void {
		if (!canvasElement) return;

		// Scene setup
		scene = new THREE.Scene();
		
		// Camera setup
		camera = new THREE.PerspectiveCamera(
			finalCameraConfig.fov,
			window.innerWidth / window.innerHeight,
			finalCameraConfig.near,
			finalCameraConfig.far
		);
		camera.position.set(
			finalCameraConfig.position.x,
			finalCameraConfig.position.y,
			finalCameraConfig.position.z
		);

		// Renderer setup
		renderer = new THREE.WebGLRenderer({ 
			canvas: canvasElement, 
			antialias: true, 
			alpha: true 
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, SCENE_3D.RENDERER.MAX_PIXEL_RATIO));
		renderer.shadowMap.enabled = true;

		// Lighting
		const directionalLight = new THREE.DirectionalLight(
			finalLightConfig.directional.color,
			finalLightConfig.directional.intensity
		);
		directionalLight.position.set(
			finalLightConfig.directional.position.x,
			finalLightConfig.directional.position.y,
			finalLightConfig.directional.position.z
		);
		scene.add(directionalLight);

		const ambientLight = new THREE.AmbientLight(
			finalLightConfig.ambient.color,
			finalLightConfig.ambient.intensity
		);
		scene.add(ambientLight);

		// Contact shadow plane
		const shadowGeometry = new THREE.PlaneGeometry(SCENE_3D.SHADOW.PLANE_SIZE, SCENE_3D.SHADOW.PLANE_SIZE);
		const shadowMaterial = new THREE.ShadowMaterial({ opacity: SCENE_3D.SHADOW.OPACITY });
		const shadowPlane = new THREE.Mesh(shadowGeometry, shadowMaterial);
		shadowPlane.rotation.x = -Math.PI / 2;
		shadowPlane.position.y = SCENE_3D.SHADOW.Y_POSITION;
		shadowPlane.receiveShadow = true;
		scene.add(shadowPlane);

		// Model group
		modelGroup = new THREE.Group();
		modelGroup.position.set(
			finalModelGroupConfig.position.x,
			finalModelGroupConfig.position.y,
			finalModelGroupConfig.position.z
		);
		modelGroup.rotation.set(
			finalModelGroupConfig.rotation.x,
			finalModelGroupConfig.rotation.y,
			finalModelGroupConfig.rotation.z
		);
		modelGroup.scale.setScalar(finalModelGroupConfig.scale ?? SCENE_3D.MODEL_GROUP.SCALE);
		scene.add(modelGroup);
	}

	async function loadModels(): Promise<void> {
		if (!modelGroup) return;

		if (models.length === 0) {
			console.warn('No models provided to Product3DScene');
			isLoading = false;
			onloaded?.();
			return;
		}

		const loader = new GLTFLoader();
		
		try {
			// Load all models in parallel
			const gltfResults = await Promise.all(
				models.map(modelConfig => loader.loadAsync(modelConfig.path))
			);

			// Process loaded models
			loadedModels = gltfResults.map((gltf, index) => {
				const model = gltf.scene;
				const config = models[index];

				// Apply individual model transformations if provided
				if (config.position) {
					model.position.set(config.position.x, config.position.y, config.position.z);
				}
				if (config.rotation) {
					model.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z);
				}
				if (config.scale) {
					model.scale.setScalar(config.scale);
				}

				modelGroup!.add(model);
				return model;
			});

			// Setup custom animations if provided
			setupScrollAnimations();
			
			// Models loaded successfully
			isLoading = false;
			onloaded?.();
		} catch (error) {
			console.error('Error loading 3D models:', error);
			isLoading = false;
			onerror?.(error);
		}
	}

	function startAnimationLoop(): void {
		if (!renderer || !scene || !camera) return;

		const animate = () => {
			requestAnimationFrame(animate);
			renderer!.render(scene!, camera!);
		};
		animate();
	}

	function setupEventListeners(): void {
		window.addEventListener('resize', handleResize);
	}

	function handleResize(): void {
		if (!camera || !renderer) return;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function cleanup(): void {
		window.removeEventListener('resize', handleResize);
		
		// Clean up animations
		if (cleanupAnimations) {
			cleanupAnimations();
		}
		
		// Kill all ScrollTriggers
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		
		// Dispose renderer
		if (renderer) {
			renderer.dispose();
		}
	}

	function setupScrollAnimations(): void {
		if (!animationSetup || !modelGroup) {
			return;
		}

		// Get all section and text elements
		const sections = Array.from(document.querySelectorAll('section[id^="section"]')) as HTMLElement[];
		const textElements = Array.from(document.querySelectorAll('[id^="text-"]')) as HTMLElement[];

		// Call the custom animation setup function
		cleanupAnimations = animationSetup({
			models: loadedModels,
			modelGroup,
			sections,
			textElements
		});
	}
</script>

<div class="canvas-container">
	<canvas bind:this={canvasElement}></canvas>
</div>

<style lang="scss">
	.canvas-container {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
