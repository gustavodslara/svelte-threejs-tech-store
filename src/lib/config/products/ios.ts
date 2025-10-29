/**
 * iPhone product configuration example
 * Demonstrates a single model setup
 */

import gsap from 'gsap';
import type { ProductPageConfig, AnimationSetupFunction } from '$lib/types';

/**
 * iPhone scroll animations - simpler single model rotation
 */
const iphoneAnimations: AnimationSetupFunction = ({
	models,
	modelGroup,
	sections,
	textElements
}) => {
	const [iPhoneModel] = models;

	const text1 = textElements.find(el => el.id === 'text-1');
	const text2 = textElements.find(el => el.id === 'text-2');
	const text3 = textElements.find(el => el.id === 'text-3');

	const section1 = sections.find(el => el.id === 'section1');
	const section2 = sections.find(el => el.id === 'section2');

	if (!text1 || !text2 || !text3 || !section1 || !section2 || !iPhoneModel) {
		console.warn('Missing required elements for iPhone animations');
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

	gsap.timeline({
		scrollTrigger: {
			trigger: section1,
			start: 'top 50%',
			end: 'top top',
			scrub: true
		}
	}).to(text2, { opacity: 1, ease: 'power2.inOut' });

	gsap.timeline({
		scrollTrigger: {
			trigger: section2,
			start: 'top 50%',
			end: 'top top',
			scrub: true
		}
	}).to(text3, { opacity: 1, ease: 'power2.inOut' });

	// Model animations - Section 1
	// Rotate to show the front of the phone
	gsap.timeline({
		scrollTrigger: {
			trigger: section1,
			start: 'top bottom',
			end: 'top top',
			scrub: true
		}
	})
		.to(modelGroup.rotation, { y: Math.PI * 0.25, ease: 'power2.inOut' })
		.to(modelGroup.position, { x: 1.2, ease: 'power2.inOut' }, '<')
		.to(modelGroup.scale, { x: 1.1, y: 1.1, z: 1.1, ease: 'power2.inOut' }, '<');

	// Model animations - Section 2
	// Rotate to show the back of the phone
	gsap.timeline({
		scrollTrigger: {
			trigger: section2,
			start: 'top bottom',
			end: 'top top',
			scrub: true
		}
	})
		.to(modelGroup.rotation, { y: -Math.PI * 0.75, ease: 'power2.inOut' })
		.to(modelGroup.position, { x: -1.2, ease: 'power2.inOut' }, '<');
};

export const iosConfig: ProductPageConfig = {
	title: 'iPhone 15 Pro',
	subtitle: 'Titanium. So strong. So light. So Pro.',
	models: [
		{
			id: 'iphone-main',
			path: '/assets/iPhone.glb' // Note: This is an example path
		}
	],
	sections: [
		{
			id: 'section1',
			textId: 'text-2',
			title: 'Aerospace-grade titanium',
			description: 'The first iPhone with a strong, light titanium design.',
			align: 'left',
			justify: 'justify-start'
		},
		{
			id: 'section2',
			textId: 'text-3',
			title: 'Pro camera system',
			description: 'Get incredible detail with the 48MP Main camera.',
			align: 'right',
			justify: 'justify-end'
		}
	],
	animationSetup: iphoneAnimations,
	meta: {
		title: 'iPhone 15 Pro - Apple',
		description: 'Titanium. So strong. So light. So Pro.'
	}
};
