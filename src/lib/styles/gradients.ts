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
 * Text shadow utilities for enhanced readability
 * Multi-layered shadows for better contrast over any background
 */
export const TEXT_SHADOWS = {
	// For large hero titles
	title: `
		0 2px 8px rgba(255, 255, 255, 0.95),
		0 4px 16px rgba(255, 255, 255, 0.8),
		0 1px 2px rgba(0, 0, 0, 0.08),
		0 0 60px rgba(255, 255, 255, 0.4)
	`,
	// For section headings
	heading: `
		0 2px 6px rgba(255, 255, 255, 0.9),
		0 3px 12px rgba(255, 255, 255, 0.7),
		0 1px 2px rgba(0, 0, 0, 0.06)
	`,
	// For subtitles and descriptions
	subtitle: `
		0 1px 4px rgba(255, 255, 255, 0.85),
		0 2px 8px rgba(255, 255, 255, 0.6),
		0 1px 1px rgba(0, 0, 0, 0.05)
	`,
	// For body text
	body: `
		0 1px 3px rgba(255, 255, 255, 0.7),
		0 1px 6px rgba(255, 255, 255, 0.5)
	`
} as const;

