<script lang="ts">
	import { onMount } from 'svelte';
	import ProductHero from './ProductHero.svelte';
	import ProductSection from './ProductSection.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import type { ProductPageConfig } from '$lib/types';

	interface Props {
		config: ProductPageConfig;
		pageTitle?: string;
		pageDescription?: string;
	}

	let { config, pageTitle = '', pageDescription = '' }: Props = $props();

	let Product3DScene = $state<any>(null);
	let mounted = $state(false);
	let modelsLoaded = $state(false);

	// Use meta from config if provided, otherwise use props
	const finalTitle = config.meta?.title || pageTitle;
	const finalDescription = config.meta?.description || pageDescription;

	onMount(async () => {
		// Dynamic import to avoid SSR issues with Three.js
		const module = await import('./Product3DScene.svelte');
		Product3DScene = module.default;
		mounted = true;
	});

	function handleModelsLoaded() {
		modelsLoaded = true;
	}

	function handleModelsError(error: unknown) {
		console.error('Failed to load 3D models:', error);
		modelsLoaded = true; // Show page even if models fail to load
	}
</script>

<svelte:head>
	{#if finalTitle}
		<title>{finalTitle}</title>
	{/if}
	{#if finalDescription}
		<meta name="description" content={finalDescription} />
	{/if}
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{#if !modelsLoaded && mounted}
	<div class="fixed inset-0 bg-white z-[9998] flex items-center justify-center">
		<LoadingSpinner size="xl" text="Loading" />
	</div>
{/if}

<main class="relative z-[2] overflow-x-hidden" class:opacity-0={!modelsLoaded} class:opacity-100={modelsLoaded} style="transition: opacity 0.5s ease-in-out;">
	<!-- Hero Section -->
	<ProductHero title={config.title} subtitle={config.subtitle} />

	<!-- Content Sections -->
	{#each config.sections as section}
		<ProductSection {section} />
	{/each}

	<!-- 3D Scene -->
	{#if mounted && Product3DScene}
		<Product3DScene
			models={config.models}
			animationSetup={config.animationSetup}
			onloaded={handleModelsLoaded}
			onerror={handleModelsError}
		/>
	{/if}
</main>
