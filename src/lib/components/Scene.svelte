<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SCENE_3D } from '$lib/constants';

	interface Props {
		modelTopPath?: string;
		modelBottomPath?: string;
	}

	let { 
		modelTopPath = '/assets/Macbook_Top.glb', 
		modelBottomPath = '/assets/Macbook_Bottom.glb' 
	}: Props = $props();

	gsap.registerPlugin(ScrollTrigger);

	// Canvas and rendering
	let canvasElement = $state<HTMLCanvasElement>();
	let renderer = $state<THREE.WebGLRenderer>();
	let scene = $state<THREE.Scene>();
	let camera = $state<THREE.PerspectiveCamera>();

	// 3D Models
	let topModel = $state<THREE.Object3D | null>(null);
	let bottomModel = $state<THREE.Object3D | null>(null);
	let modelGroup = $state<THREE.Group>();

	onMount(() => {
		if (!canvasElement) return;

		initializeScene();
		loadModels();
		startAnimationLoop();
		setupEventListeners();

		return cleanup;
	});

	function initializeScene(): void {
		if (!canvasElement) return;

		// Scene setup
		scene = new THREE.Scene();
		
		// Camera setup
		camera = new THREE.PerspectiveCamera(
			SCENE_3D.CAMERA.FOV,
			window.innerWidth / window.innerHeight,
			SCENE_3D.CAMERA.NEAR,
			SCENE_3D.CAMERA.FAR
		);
		camera.position.set(
			SCENE_3D.CAMERA.POSITION.x,
			SCENE_3D.CAMERA.POSITION.y,
			SCENE_3D.CAMERA.POSITION.z
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
			SCENE_3D.LIGHTING.DIRECTIONAL.COLOR,
			SCENE_3D.LIGHTING.DIRECTIONAL.INTENSITY
		);
		directionalLight.position.set(
			SCENE_3D.LIGHTING.DIRECTIONAL.POSITION.x,
			SCENE_3D.LIGHTING.DIRECTIONAL.POSITION.y,
			SCENE_3D.LIGHTING.DIRECTIONAL.POSITION.z
		);
		scene.add(directionalLight);

		const ambientLight = new THREE.AmbientLight(
			SCENE_3D.LIGHTING.AMBIENT.COLOR,
			SCENE_3D.LIGHTING.AMBIENT.INTENSITY
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
			SCENE_3D.MODEL_GROUP.POSITION.x,
			SCENE_3D.MODEL_GROUP.POSITION.y,
			SCENE_3D.MODEL_GROUP.POSITION.z
		);
		modelGroup.rotation.set(
			SCENE_3D.MODEL_GROUP.ROTATION.x,
			SCENE_3D.MODEL_GROUP.ROTATION.y,
			SCENE_3D.MODEL_GROUP.ROTATION.z
		);
		modelGroup.scale.setScalar(SCENE_3D.MODEL_GROUP.SCALE);
		scene.add(modelGroup);
	}

	async function loadModels(): Promise<void> {
		if (!modelGroup) return;

		const loader = new GLTFLoader();
		
		try {
			const [topGltf, bottomGltf] = await Promise.all([
				loader.loadAsync(modelTopPath),
				loader.loadAsync(modelBottomPath)
			]);

			topModel = topGltf.scene;
			bottomModel = bottomGltf.scene;
			
			modelGroup.add(topModel);
			modelGroup.add(bottomModel);

			setupScrollAnimations();
		} catch (error) {
			console.error('Error loading 3D models:', error);
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
		
		if (renderer) {
			renderer.dispose();
		}
		
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	}

	function setupScrollAnimations(): void {
		const text1 = document.getElementById('text-1');
		const text2 = document.getElementById('text-2');
		const text3 = document.getElementById('text-3');

		if (!text1 || !text2 || !text3 || !topModel || !modelGroup) return;

		// Text fade animations
		gsap.timeline({
			scrollTrigger: {
				trigger: '#section1',
				start: 'top bottom',
				end: '10% bottom',
				scrub: true
			}
		}).to(text1, { opacity: 0, ease: 'power2.inOut' });

		gsap.timeline({
			scrollTrigger: {
				trigger: '#section1',
				start: 'top 50%',
				end: 'top top',
				scrub: true
			}
		}).to(text2, { opacity: 1, ease: 'power2.inOut' });

		gsap.timeline({
			scrollTrigger: {
				trigger: '#section2',
				start: 'top 50%',
				end: 'top top',
				scrub: true
			}
		}).to(text3, { opacity: 1, ease: 'power2.inOut' }, '<');

		// Model animations - Section 1
		gsap.timeline({
			scrollTrigger: {
				trigger: '#section1',
				start: 'top bottom',
				end: 'top top',
				scrub: true
			}
		})
			.to(modelGroup.rotation, { x: 0.0, ease: 'power2.inOut' })
			.to(modelGroup.rotation, { y: Math.PI - 0.4, ease: 'power2.inOut' }, '>')
			.to(topModel.rotation, { x: Math.PI / 2 + 0.1, ease: 'power2.inOut' }, '<')
			.to(modelGroup.position, { x: 1.3, ease: 'power2.inOut' }, '<')
			.to(modelGroup.scale, { x: 0.7, y: 0.7, z: 0.7, ease: 'power2.inOut' }, '<');

		// Model animations - Section 2
		gsap.timeline({
			scrollTrigger: {
				trigger: '#section2',
				start: 'top bottom',
				end: 'top top',
				scrub: true
			}
		})
			.to(modelGroup.rotation, { y: Math.PI + 0.4, ease: 'power2.inOut' })
			.to(modelGroup.position, { x: -1.3, ease: 'power2.inOut' }, '<');
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
