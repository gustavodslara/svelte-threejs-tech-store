/**
 * Gradient utilities for backdrop blur effects
 * Provides smooth, professional radial gradients for text readability
 */

export const GRADIENTS = {
	/**
	 * Hero section gradient - insanely aggressive fade to transparent
	 */
	hero: {
		background: `radial-gradient(
			ellipse 160% 180% at center,
			rgba(255, 255, 255, 0.98) 0%,
			rgba(255, 255, 255, 0.60) 5%,
			rgba(255, 255, 255, 0.30) 10%,
			rgba(255, 255, 255, 0.12) 15%,
			rgba(255, 255, 255, 0.04) 20%,
			rgba(255, 255, 255, 0.01) 25%,
			rgba(255, 255, 255, 0) 30%,
			rgba(255, 255, 255, 0) 100%
		)`,
		blur: '32px'
	},

	/**
	 * Section text gradient - insanely aggressive fade to transparent
	 */
	section: {
		background: `radial-gradient(
			ellipse 150% 170% at center,
			rgba(255, 255, 255, 0.97) 0%,
			rgba(255, 255, 255, 0.55) 8%,
			rgba(255, 255, 255, 0.26) 15%,
			rgba(255, 255, 255, 0.10) 22%,
			rgba(255, 255, 255, 0.03) 28%,
			rgba(255, 255, 255, 0.01) 34%,
			rgba(255, 255, 255, 0) 40%,
			rgba(255, 255, 255, 0) 100%
		)`,
		blur: '28px'
	}
} as const;

/**
 * Text shadow utilities - none needed, using backdrop blur instead
 */
export const TEXT_SHADOWS = {
	// No shadows - plain text
	title: 'none',
	heading: 'none',
	subtitle: 'none',
	body: 'none'
} as const;

