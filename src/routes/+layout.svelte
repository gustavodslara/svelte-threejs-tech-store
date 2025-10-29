<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import '../app.scss';
	import Navbar from '$lib/components/Navbar.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { ANIMATION } from '$lib/constants';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isLoading = $state(true);

	onMount(() => {
		// Wait for DOM to be fully loaded and rendered
		const timer = setTimeout(() => {
			isLoading = false;
		}, ANIMATION.INITIAL_LOAD_DELAY);

		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>MacBook Pro M4 - 3D Scrolling Animation</title>
	<meta name="description" content="Meet the MacBook Pro M4 - Power re-imagined" />
</svelte:head>

{#if isLoading}
	<LoadingSpinner fullscreen={true} size="xl" text="Loading" />
{:else}
	<Navbar />
	{@render children()}
{/if}

