/**
 * MacBook Pro product configuration
 */

import type { ProductPageConfig } from '$lib/types';
import { macbookProAnimations } from '$lib/animations/macbook-pro';

export const macbookProConfig: ProductPageConfig = {
	title: 'Meet the MacBook Pro M4',
	subtitle: 'Power re-imagined.',
	models: [
		{
			id: 'macbook-top',
			path: '/assets/Macbook_Top.glb'
		},
		{
			id: 'macbook-bottom',
			path: '/assets/Macbook_Bottom.glb'
		}
	],
	sections: [
		{
			id: 'section1',
			textId: 'text-2',
			title: 'Retina Display',
			description: 'Razor-sharp text, breathtaking colors, and lifelike tones for an immersive visual experience.',
			align: 'left',
			justify: 'justify-start'
		},
		{
			id: 'section2',
			textId: 'text-3',
			title: 'Top of Class Performance',
			description: 'Handle the most computationally intensive tasks with ease.',
			align: 'right',
			justify: 'justify-end'
		}
	],
	animationSetup: macbookProAnimations,
	meta: {
		title: 'MacBook Pro M4 - Apple',
		description: 'Meet the MacBook Pro M4 - Power re-imagined'
	}
};
