<script lang="ts">
	import { T, useLoader } from '@threlte/core';
	import { GLTF } from '@threlte/extras';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import * as THREE from 'three';

	gsap.registerPlugin(ScrollTrigger);

	let groupRef: THREE.Group;
	let topMeshRef: THREE.Object3D;

	onMount(() => {
		if (!groupRef) return;

		// Wait a bit for the models to load before animating
		const timeout = setTimeout(() => {
			gsap
				.timeline({
					scrollTrigger: {
						trigger: '#section1',
						start: 'top bottom',
						end: 'top top',
						scrub: true
					}
				})
				.to(groupRef.rotation, {
					x: 0.0,
					ease: 'power2.inOut'
				})
				.to(
					groupRef.rotation,
					{
						y: Math.PI - 0.4,
						ease: 'power2.inOut'
					},
					'>'
				)
				.to(
					topMeshRef ? topMeshRef.rotation : {},
					{
						x: Math.PI / 2 + 0.1,
						ease: 'power2.inOut'
					},
					'<'
				)
				.to(
					groupRef.position,
					{
						x: 1.3,
						ease: 'power2.inOut'
					},
					'<'
				)
				.to(
					groupRef.scale,
					{
						x: 0.7,
						y: 0.7,
						z: 0.7,
						ease: 'power2.inOut'
					},
					'<'
				);

			gsap
				.timeline({
					scrollTrigger: {
						trigger: '#section2',
						start: 'top bottom',
						end: 'top top',
						scrub: true
					}
				})
				.to(groupRef.rotation, {
					y: Math.PI + 0.4,
					ease: 'power2.inOut'
				})
				.to(
					groupRef.position,
					{
						x: -1.3,
						ease: 'power2.inOut'
					},
					'<'
				);
		}, 100);

		return () => {
			clearTimeout(timeout);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<T.Group
	bind:ref={groupRef}
	position={[0, -0.7, 0]}
	rotation={[Math.PI / 2, 0, 0]}
	scale={1.3}
>
	<T.Group bind:ref={topMeshRef}>
		<GLTF url="/assets/Macbook_Top.glb" />
	</T.Group>
	<T.Group>
		<GLTF url="/assets/Macbook_Bottom.glb" />
	</T.Group>
</T.Group>
