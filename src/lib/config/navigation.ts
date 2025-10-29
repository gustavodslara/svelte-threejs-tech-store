/**
 * Navigation configuration
 * Type-safe navigation structure with runtime validation
 */

import type { NavLink, ProductLink, ProductCategory } from '$lib/types';

/**
 * Main navigation links
 * @readonly
 */
export const MAIN_NAV_LINKS: readonly NavLink[] = [
	{ label: 'Shop', href: '/shop' },
	{ label: 'Support', href: '/support' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
] as const;

/**
 * Product categories
 * @readonly
 */
export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
	{ id: 'laptop', name: 'Laptop', description: 'Powerful portability' },
	{ id: 'smartphone', name: 'Smartphone', description: 'Innovation in your pocket' },
	{ id: 'vr', name: 'VR', description: 'Spatial computing' },
	{ id: 'desktop', name: 'Desktop', description: 'Ultimate performance' }
] as const;

/**
 * Product links with full metadata
 * @readonly
 */
export const PRODUCT_LINKS: readonly ProductLink[] = [
	{ 
		label: 'MacBook Pro', 
		href: '/products/macbook-pro',
		description: 'The ultimate pro notebook',
		category: 'Laptop',
		icon: '💻'
	},
	{ 
		label: 'MacBook Air', 
		href: '/products/macbook-air',
		description: 'Supercharged by M3',
		category: 'Laptop',
		icon: '💻'
	},
	{ 
		label: 'MacBook', 
		href: '/products/macbook',
		description: 'Light. Portable. Powerful.',
		category: 'Laptop',
		icon: '💻'
	},
	{ 
		label: 'iPhone 15 Pro', 
		href: '/products/ios',
		description: 'Titanium. So strong. So light.',
		category: 'Smartphone',
		icon: '📱'
	},
	{ 
		label: 'Vision Pro', 
		href: '/products/vision-pro',
		description: 'Spatial computing is here',
		category: 'VR',
		icon: '🥽'
	}
] as const;

/**
 * Get products filtered by category
 * @param category - The category name to filter by
 * @returns Array of products matching the category
 */
export function getProductsByCategory(category: string): readonly ProductLink[] {
	return PRODUCT_LINKS.filter(product => product.category === category);
}

/**
 * Get all products grouped by category
 * @returns Object with category names as keys and product arrays as values
 */
export function getProductsGroupedByCategory(): Readonly<Record<string, readonly ProductLink[]>> {
	const grouped: Record<string, readonly ProductLink[]> = {};
	
	PRODUCT_CATEGORIES.forEach(cat => {
		grouped[cat.name] = getProductsByCategory(cat.name);
	});
	
	return grouped;
}

/**
 * Type guard to check if a string is a valid category
 */
export function isValidCategory(category: string): category is ProductLink['category'] {
	return ['Laptop', 'Smartphone', 'VR', 'Desktop'].includes(category);
}
