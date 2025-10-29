/**
 * Vision Pro product configuration example
 * Demonstrates a triple model setup with more complex animations
 */

import gsap from 'gsap';
import type { ProductPageConfig, AnimationSetupFunction } from '$lib/types';

/**
 * Vision Pro scroll animations - complex multi-part assembly
 */
const visionProAnimations: AnimationSetupFunction = ({
	models,
	modelGroup,
	sections,
	textElements
}) => {
	const [lensAssembly, headband, frontGlass] = models;

	const text1 = textElements.find(el => el.id === 'text-1');
	const text2 = textElements.find(el => el.id === 'text-2');
	const text3 = textElements.find(el => el.id === 'text-3');
	const text4 = textElements.find(el => el.id === 'text-4');

	const section1 = sections.find(el => el.id === 'section1');
	const section2 = sections.find(el => el.id === 'section2');
	const section3 = sections.find(el => el.id === 'section3');

	if (!text1 || !section1) {
		console.warn('Missing required elements for Vision Pro animations');
		return;
	}

	// Text fade animations
	gsap.timeline({
		scrollTrigger: {
			trigger: section1,
			start: 'top bottom',
			end: '10% bottom',
			scrub: true
		}
	}).to(text1, { opacity: 0, ease: 'power2.inOut' });

	if (text2 && section1) {
		gsap.timeline({
			scrollTrigger: {
				trigger: section1,
				start: 'top 50%',
				end: 'top top',
				scrub: true
			}
		}).to(text2, { opacity: 1, ease: 'power2.inOut' });
	}

	if (text3 && section2) {
		gsap.timeline({
			scrollTrigger: {
				trigger: section2,
				start: 'top 50%',
				end: 'top top',
				scrub: true
			}
		}).to(text3, { opacity: 1, ease: 'power2.inOut' });
	}

	if (text4 && section3) {
		gsap.timeline({
			scrollTrigger: {
				trigger: section3,
				start: 'top 50%',
				end: 'top top',
				scrub: true
			}
		}).to(text4, { opacity: 1, ease: 'power2.inOut' });
	}

	// Model animations - Section 1
	// Explode view - separate the components
	if (section1 && lensAssembly && headband && frontGlass) {
		gsap.timeline({
			scrollTrigger: {
				trigger: section1,
				start: 'top bottom',
				end: 'top top',
				scrub: true
			}
		})
			.to(modelGroup.rotation, { y: Math.PI * 0.15, ease: 'power2.inOut' })
			.to(lensAssembly.position, { z: 0.3, ease: 'power2.inOut' }, '<')
			.to(headband.position, { z: -0.3, ease: 'power2.inOut' }, '<')
			.to(frontGlass.position, { z: 0.5, ease: 'power2.inOut' }, '<')
			.to(modelGroup.position, { x: 1.0, ease: 'power2.inOut' }, '<');
	}

	// Model animations - Section 2
	// Reassemble and rotate to side view
	if (section2 && lensAssembly && headband && frontGlass) {
		gsap.timeline({
			scrollTrigger: {
				trigger: section2,
				start: 'top bottom',
				end: 'top top',
				scrub: true
			}
		})
			.to(lensAssembly.position, { z: 0, ease: 'power2.inOut' })
			.to(headband.position, { z: 0, ease: 'power2.inOut' }, '<')
			.to(frontGlass.position, { z: 0, ease: 'power2.inOut' }, '<')
			.to(modelGroup.rotation, { y: Math.PI * 0.5, ease: 'power2.inOut' }, '<')
			.to(modelGroup.position, { x: -1.0, ease: 'power2.inOut' }, '<');
	}

	// Model animations - Section 3
	// Top view
	if (section3) {
		gsap.timeline({
			scrollTrigger: {
				trigger: section3,
				start: 'top bottom',
				end: 'top top',
				scrub: true
			}
		})
			.to(modelGroup.rotation, { x: -Math.PI * 0.3, y: Math.PI * 0.25, ease: 'power2.inOut' })
			.to(modelGroup.position, { x: 0, y: 0.5, ease: 'power2.inOut' }, '<');
	}
};

export const visionProConfig: ProductPageConfig = {
	title: 'Apple Vision Pro',
	subtitle: 'Welcome to spatial computing.',
	models: [
		{
			id: 'vision-lens-assembly',
			path: '/assets/VisionPro_Lens.glb' // Example path
		},
		{
			id: 'vision-headband',
			path: '/assets/VisionPro_Headband.glb' // Example path
		},
		{
			id: 'vision-front-glass',
			path: '/assets/VisionPro_Glass.glb' // Example path
		}
	],
	sections: [
		{
			id: 'section1',
			textId: 'text-2',
			title: 'Extraordinary hardware',
			description: 'An advanced Spatial Audio system creates lifelike soundscapes.',
			align: 'left',
			justify: 'justify-start'
		},
		{
			id: 'section2',
			textId: 'text-3',
			title: 'Revolutionary display',
			description: 'Two ultra-high-resolution displays create breathtaking detail.',
			align: 'right',
			justify: 'justify-end'
		},
		{
			id: 'section3',
			textId: 'text-4',
			title: 'Ergonomic design',
			description: 'Modular system for a personalized fit.',
			align: 'left',
			justify: 'justify-start'
		}
	],
	animationSetup: visionProAnimations,
	meta: {
		title: 'Apple Vision Pro - Apple',
		description: 'Welcome to spatial computing.'
	}
};
