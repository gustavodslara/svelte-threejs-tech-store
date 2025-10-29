/**
 * Application-wide constants
 * Centralized location for magic numbers and configuration values
 */

/**
 * Animation timing constants
 */
export const ANIMATION = {
	/** Initial loading delay in milliseconds */
	INITIAL_LOAD_DELAY: 500,
	/** Fade transition duration in milliseconds */
	FADE_DURATION: 200,
	/** Slide transition duration in milliseconds */
	SLIDE_DURATION: 300,
	/** Page transition duration in milliseconds */
	PAGE_TRANSITION: 500
} as const;

/**
 * 3D Scene default configurations
 */
export const SCENE_3D = {
	CAMERA: {
		FOV: 60,
		NEAR: 0.1,
		FAR: 1000,
		POSITION: { x: 0, y: 0, z: 5 }
	},
	MODEL_GROUP: {
		POSITION: { x: 0, y: -0.7, z: 0 },
		ROTATION: { x: Math.PI / 2, y: 0, z: 0 },
		SCALE: 1.3
	},
	LIGHTING: {
		DIRECTIONAL: {
			COLOR: 0xffffff,
			INTENSITY: 5,
			POSITION: { x: 1, y: 3, z: 3 }
		},
		AMBIENT: {
			COLOR: 0xffffff,
			INTENSITY: 0.5
		}
	},
	SHADOW: {
		PLANE_SIZE: 10,
		OPACITY: 0.3,
		Y_POSITION: -0.9
	},
	RENDERER: {
		MAX_PIXEL_RATIO: 2
	}
} as const;

/**
 * Z-index layers for proper stacking
 */
export const Z_INDEX = {
	CANVAS: 1,
	CONTENT: 2,
	NAVBAR: 100,
	MOBILE_OVERLAY: 150,
	MOBILE_MENU: 200,
	LOADING_SCREEN: 9998,
	LOADING_OVERLAY: 9999
} as const;

/**
 * Breakpoint values (should match Tailwind config)
 */
export const BREAKPOINTS = {
	SM: 640,
	MD: 768,
	LG: 1024,
	XL: 1280,
	'2XL': 1536
} as const;

/**
 * Color palette for brand consistency
 */
export const COLORS = {
	APPLE_TEXT: '#1d1d1f',
	APPLE_GRAY: '#86868b',
	APPLE_BLUE: '#0066cc',
	APPLE_LIGHT_GRAY: '#f5f5f7'
} as const;

/**
 * Typography scale
 */
export const FONT_FAMILIES = {
	DISPLAY: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', 'Arial', sans-serif",
	TEXT: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', 'Arial', sans-serif"
} as const;
