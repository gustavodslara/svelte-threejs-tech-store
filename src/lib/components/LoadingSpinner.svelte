<script lang="ts">
	import { Z_INDEX } from '$lib/constants';

	interface Props {
		size?: 'sm' | 'md' | 'lg' | 'xl';
		color?: 'white' | 'gray' | 'black';
		fullscreen?: boolean;
		text?: string;
	}

	let { size = 'md', color = 'gray', fullscreen = false, text = '' }: Props = $props();

	const sizeClasses = {
		sm: 'w-6 h-6',
		md: 'w-10 h-10',
		lg: 'w-16 h-16',
		xl: 'w-24 h-24'
	} as const;

	const colorClasses = {
		white: 'border-white',
		gray: 'border-gray-600',
		black: 'border-black'
	} as const;

	const spinnerClass = `${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`;
</script>

{#if fullscreen}
	<div class="fixed inset-0 bg-white flex flex-col items-center justify-center" style="z-index: {Z_INDEX.LOADING_SCREEN};">
		<div class={spinnerClass} role="status" aria-label="Loading"></div>
		{#if text}
			<p class="mt-4 text-lg" style="color: #1d1d1f; font-weight: 400;">{text}</p>
		{/if}
	</div>
{:else}
	<div class="flex flex-col items-center justify-center">
		<div class={spinnerClass} role="status" aria-label="Loading"></div>
		{#if text}
			<p class="mt-3" style="color: #1d1d1f; font-weight: 400;">{text}</p>
		{/if}
	</div>
{/if}

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	
	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
