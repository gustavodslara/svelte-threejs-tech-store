<script lang="ts">
	import SectionText from './SectionText.svelte';
	import type { ContentSection } from '$lib/types';

	export let section: ContentSection;
</script>

<section 
	id={section.id} 
	class="h-screen flex items-center {section.justify} relative bg-transparent overflow-hidden"
>
	<SectionText
		id={section.textId}
		title={section.title}
		description={section.description}
		align={section.align}
		image={section.image}
		icon={section.icon}
	/>
</section>
