/**
 * MacBook Pro scroll-based animation configuration
 * This defines the scroll animations for the MacBook Pro models
 */

import gsap from 'gsap';
import type { AnimationSetupFunction } from '$lib/types';

/**
 * Setup scroll animations for MacBook Pro
 * Assumes models array has 2 items: [topModel, bottomModel]
 */
export const macbookProAnimations: AnimationSetupFunction = ({
	models,
	modelGroup,
	sections,
	textElements
}) => {
	const [topModel, bottomModel] = models;

	// Get specific text elements
	const text1 = textElements.find(el => el.id === 'text-1');
	const text2 = textElements.find(el => el.id === 'text-2');
	const text3 = textElements.find(el => el.id === 'text-3');

	const section1 = sections.find(el => el.id === 'section1');
	const section2 = sections.find(el => el.id === 'section2');

	if (!text1 || !text2 || !text3 || !section1 || !section2 || !topModel) {
		console.warn('Missing required elements for MacBook Pro animations');
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
	}).to(text3, { opacity: 1, ease: 'power2.inOut' }, '<');

	// Model animations - Section 1
	// Opens the MacBook and rotates it to show the screen
	gsap.timeline({
		scrollTrigger: {
			trigger: section1,
			start: 'top bottom',
			end: 'top top',
			scrub: true
		}
	})
		.to(modelGroup.rotation, { x: 0.0, ease: 'power2.inOut' })
		.to(modelGroup.rotation, { y: Math.PI - 0.4, ease: 'power2.inOut' }, '>')
		.to(topModel.rotation, { x: Math.PI / 2 + 0.1, ease: 'power2.inOut' }, '<')
		.to(modelGroup.position, { x: 1.3, ease: 'power2.inOut' }, '<')
		.to(modelGroup.scale, { x: 0.7, y: 0.7, z: 0.7, ease: 'power2.inOut' }, '<');

	// Model animations - Section 2
	// Rotates the MacBook to show the other side
	gsap.timeline({
		scrollTrigger: {
			trigger: section2,
			start: 'top bottom',
			end: 'top top',
			scrub: true
		}
	})
		.to(modelGroup.rotation, { y: Math.PI + 0.4, ease: 'power2.inOut' })
		.to(modelGroup.position, { x: -1.3, ease: 'power2.inOut' }, '<');

	// Return cleanup function
	return () => {
		// Cleanup is handled by Product3DScene component
	};
};
