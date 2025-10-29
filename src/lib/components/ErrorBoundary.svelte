<script lang="ts">
	/**
	 * ErrorBoundary Component
	 * Provides graceful error handling for child components
	 * Modern Svelte 5 pattern with $props and snippets
	 */
	import { type Snippet } from 'svelte';

	interface Props {
		/** Content to be rendered */
		children: Snippet;
		/** Optional fallback UI when error occurs */
		fallback?: Snippet<[Error]>;
		/** Optional error handler callback */
		onError?: (error: Error) => void;
	}

	let { children, fallback, onError }: Props = $props();

	let error = $state<Error | null>(null);

	function handleError(event: ErrorEvent) {
		error = event.error;
		onError?.(event.error);
		console.error('ErrorBoundary caught error:', event.error);
	}

	function reset() {
		error = null;
	}

	$effect(() => {
		window.addEventListener('error', handleError);
		return () => window.removeEventListener('error', handleError);
	});
</script>

{#if error && fallback}
	{@render fallback(error)}
{:else if error}
	<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
		<div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
			<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>
			<h2 class="text-2xl font-semibold mb-2 text-gray-900">Something went wrong</h2>
			<p class="text-gray-600 mb-6">We encountered an unexpected error. Please try again.</p>
			<div class="space-y-3">
				<button
					onclick={reset}
					class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
				>
					Try Again
				</button>
				<button
					onclick={() => window.location.reload()}
					class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
				>
					Reload Page
				</button>
			</div>
			{#if import.meta.env.DEV}
				<details class="mt-6 text-left">
					<summary class="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
						Error Details (Development Only)
					</summary>
					<pre class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto text-red-600">
{error.message}

{error.stack}
					</pre>
				</details>
			{/if}
		</div>
	</div>
{:else}
	{@render children()}
{/if}
