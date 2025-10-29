/**
 * TypeScript type definitions
 */

import type * as THREE from 'three';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface NavLink {
	label: string;
	href: string;
}

export interface ProductLink {
	label: string;
	href: string;
	description?: string;
	category: 'Laptop' | 'Smartphone' | 'VR' | 'Desktop';
	icon?: string;
}

export interface ProductCategory {
	id: string;
	name: string;
	description?: string;
}

export interface ContentSection {
	id: string;
	textId: string;
	title: string;
	description: string;
	align: 'left' | 'right' | 'center';
	justify: 'justify-start' | 'justify-center' | 'justify-end';
	image?: string;
	icon?: string;
}

/**
 * Configuration for a single 3D model
 */
export interface ModelConfig {
	/** Unique identifier for the model */
	id: string;
	/** Path to the .glb file */
	path: string;
	/** Initial position offset (optional) */
	position?: { x: number; y: number; z: number };
	/** Initial rotation offset (optional) */
	rotation?: { x: number; y: number; z: number };
	/** Initial scale (optional, defaults to 1) */
	scale?: number;
}

/**
 * Animation setup function for scroll-based animations
 * Receives model references and section elements to set up GSAP ScrollTriggers
 */
export type AnimationSetupFunction = (params: {
	models: THREE.Object3D[];
	modelGroup: THREE.Group;
	sections: HTMLElement[];
	textElements: HTMLElement[];
}) => void | (() => void);

/**
 * Product page configuration
 */
export interface ProductPageConfig {
	/** Product title shown in hero */
	title: string;
	/** Product subtitle shown in hero */
	subtitle: string;
	/** Array of 3D models to load (1 to N models) */
	models: ModelConfig[];
	/** Content sections */
	sections: ContentSection[];
	/** Optional: Custom scroll animation setup function */
	animationSetup?: AnimationSetupFunction;
	/** Optional: SEO metadata */
	meta?: {
		title?: string;
		description?: string;
	};
}

/**
 * Props for the 3D scene component
 */
export interface Product3DSceneProps {
	models: ModelConfig[];
	animationSetup?: AnimationSetupFunction;
	cameraConfig?: {
		fov?: number;
		near?: number;
		far?: number;
		position?: { x: number; y: number; z: number };
	};
	modelGroupConfig?: {
		position?: { x: number; y: number; z: number };
		rotation?: { x: number; y: number; z: number };
		scale?: number;
	};
	lightConfig?: {
		directional?: {
			color?: number;
			intensity?: number;
			position?: { x: number; y: number; z: number };
		};
		ambient?: {
			color?: number;
			intensity?: number;
		};
	};
}
