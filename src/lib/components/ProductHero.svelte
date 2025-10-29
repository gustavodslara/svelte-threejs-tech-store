<script lang="ts">
	import { GRADIENTS, TEXT_SHADOWS } from '$lib/styles/gradients';

	export let title: string;
	export let subtitle: string;

	const heroBackdropStyle = `background: ${GRADIENTS.hero.background}`;
</script>

<section id="hero" class="h-screen flex items-end justify-center relative bg-transparent overflow-hidden">
	<div id="text-1" class="text-center mb-32 sm:mb-40 lg:mb-64 z-10 relative px-4 sm:px-6 opacity-100">
		<!-- White gradient background - fades to transparent -->
		<div 
			class="absolute inset-0 -inset-x-32 -inset-y-48 sm:-inset-x-40 sm:-inset-y-56 md:-inset-x-48 md:-inset-y-64 lg:-inset-x-56 lg:-inset-y-72 z-[-1] pointer-events-none overflow-hidden"
			style="{heroBackdropStyle};"
		></div>
		
		<div class="relative z-1">
			<h1 
				class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-semibold mb-4 sm:mb-5 tracking-tight" 
				style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', 'Arial', sans-serif; text-shadow: {TEXT_SHADOWS.title}; color: #1d1d1f; font-weight: 600; letter-spacing: -0.02em;"
			>
				{title}
			</h1>
			<p 
				class="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-700" 
				style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', 'Arial', sans-serif; text-shadow: {TEXT_SHADOWS.subtitle}; font-weight: 400;"
			>
				{subtitle}
			</p>
		</div>
	</div>
</section>
