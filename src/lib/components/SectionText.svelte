<script lang="ts">
	import { GRADIENTS, TEXT_SHADOWS } from '$lib/styles/gradients';

	export let id: string;
	export let title: string;
	export let description: string;
	export let align: 'left' | 'right' | 'center' = 'left';
	export let image: string | undefined = undefined;
	export let icon: string | undefined = undefined;

	const backdropStyle = `background: ${GRADIENTS.section.background}`;
</script>

<div 
	{id} 
	class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0"
	class:text-right={align === 'right'}
	class:text-center={align === 'center'}
>
	<div 
		class="max-w-lg sm:max-w-xl relative z-10"
		class:ml-auto={align === 'right'}
		class:mx-auto={align === 'center'}
	>
		<!-- White gradient background - fades to transparent -->
		<div 
			class="absolute inset-0 -inset-x-28 -inset-y-40 sm:-inset-x-36 sm:-inset-y-48 md:-inset-x-44 md:-inset-y-56 lg:-inset-x-52 lg:-inset-y-64 z-[-1] pointer-events-none overflow-hidden"
			style="{backdropStyle};"
		></div>
		
		<div class="relative z-1 space-y-4 sm:space-y-6">
			<!-- Icon or Image -->
			{#if icon}
				<div class="flex" class:justify-end={align === 'right'} class:justify-center={align === 'center'}>
					<img 
						src={icon} 
						alt="" 
						class="w-12 h-12 sm:w-16 sm:h-16 object-contain"
						loading="lazy"
					/>
				</div>
			{:else if image}
				<div class="flex" class:justify-end={align === 'right'} class:justify-center={align === 'center'}>
					<img 
						src={image} 
						alt={title} 
						class="w-full max-w-md rounded-lg shadow-lg"
						loading="lazy"
					/>
				</div>
			{/if}

			<!-- Text Content -->
			<div>
				<h2 
					class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-3 sm:mb-4 tracking-tight" 
					style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', 'Arial', sans-serif; text-shadow: {TEXT_SHADOWS.heading}; color: #1d1d1f; font-weight: 600; letter-spacing: -0.02em;"
				>
					{title}
				</h2>
				<p 
					class="text-xl sm:text-2xl md:text-3xl font-normal text-gray-700" 
					style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', 'Arial', sans-serif; text-shadow: {TEXT_SHADOWS.subtitle}; font-weight: 400;"
				>
					{description}
				</p>
			</div>
		</div>
	</div>
</div>
