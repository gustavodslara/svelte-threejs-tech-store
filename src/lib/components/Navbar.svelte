<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { MAIN_NAV_LINKS, PRODUCT_CATEGORIES, getProductsByCategory } from '$lib/config/navigation';
	import { ANIMATION, Z_INDEX } from '$lib/constants';
	
	let showProductsDropdown = $state(false);
	let showMobileMenu = $state(false);
	let dropdownElement = $state<HTMLDivElement>();

	function toggleProductsDropdown(event: MouseEvent) {
		event.stopPropagation();
		showProductsDropdown = !showProductsDropdown;
	}

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
		// Prevent body scroll when menu is open
		if (showMobileMenu) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMobileMenu() {
		showMobileMenu = false;
		document.body.style.overflow = '';
	}

	function handleProductClick() {
		showProductsDropdown = false;
		closeMobileMenu();
	}

	function handleClickOutside(event: MouseEvent) {
		if (showProductsDropdown && dropdownElement && !dropdownElement.contains(event.target as Node)) {
			showProductsDropdown = false;
		}
	}

	function handleOverlayKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeMobileMenu();
		}
	}

	$effect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<nav class="sticky top-0 bg-white/85 backdrop-blur-xl shadow-sm border-b border-gray-100" style="z-index: {Z_INDEX.NAVBAR};">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center py-3">
			<!-- Logo -->
			<a 
				href="/" 
				class="text-lg sm:text-xl font-semibold hover:opacity-70 transition-opacity"
				style="color: #1d1d1f; font-weight: 600; letter-spacing: -0.01em;"
				aria-label="Apple Home"
			>
				Apple
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-4 lg:space-x-6">
				<!-- Products Dropdown -->
				<div class="relative" bind:this={dropdownElement}>
					<button
						onclick={toggleProductsDropdown}
						class="font-normal hover:opacity-70 transition-opacity text-sm lg:text-base flex items-center gap-1 cursor-pointer"
						style="color: #1d1d1f; font-weight: 400;"
						aria-expanded={showProductsDropdown}
						aria-haspopup="true"
					>
						Products
						<svg 
							class="w-4 h-4 transition-transform {showProductsDropdown ? 'rotate-180' : ''}" 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if showProductsDropdown}
						<div class="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-3" style="z-index: {Z_INDEX.DROPDOWN};">
							{#each PRODUCT_CATEGORIES as category}
								{@const products = getProductsByCategory(category.name)}
								{#if products.length > 0}
									<div class="px-4 py-3">
										<div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
											{category.name}
										</div>
										<div class="space-y-1">
											{#each products as product}
												<a
													href={product.href}
													onclick={() => { showProductsDropdown = false; }}
													class="block px-3 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
												>
													<div class="flex items-center gap-3">
														<span class="text-2xl">{product.icon || '📦'}</span>
														<div class="flex-1">
															<div class="font-medium text-sm" style="color: #1d1d1f; font-weight: 500;">{product.label}</div>
															{#if product.description}
																<div class="text-xs text-gray-600 mt-0.5" style="font-weight: 400;">{product.description}</div>
															{/if}
														</div>
													</div>
												</a>
											{/each}
										</div>
									</div>
									<div class="border-t border-gray-100 my-2"></div>
								{/if}
							{/each}
							<a
								href="/#explore"
								onclick={() => { showProductsDropdown = false; }}
								class="block px-4 py-2 text-sm hover:bg-gray-50 font-medium transition-colors cursor-pointer"
								style="color: #0066cc; font-weight: 500;"
							>
								View All Products →
							</a>
						</div>
					{/if}
				</div>

				<!-- Other Nav Links -->
				{#each MAIN_NAV_LINKS as { label, href }}
					<a 
						{href} 
						class="font-normal hover:opacity-70 transition-opacity text-sm lg:text-base"
						style="color: #1d1d1f; font-weight: 400;"
					>
						{label}
					</a>
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMobileMenu}
				class="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
				aria-label="Toggle menu"
				aria-expanded={showMobileMenu}
				style="color: #1d1d1f;"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	</div>
</nav>

<!-- Mobile Side Menu -->
{#if showMobileMenu}
	<!-- Overlay -->
	<button
		class="fixed inset-0 bg-black/50 md:hidden cursor-default"
		style="z-index: {Z_INDEX.MOBILE_OVERLAY};"
		onclick={closeMobileMenu}
		onkeydown={handleOverlayKeydown}
		aria-label="Close menu overlay"
		transition:fade={{ duration: ANIMATION.FADE_DURATION }}
	></button>

	<!-- Side Menu -->
	<div 
		class="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white md:hidden overflow-y-auto"
		style="z-index: {Z_INDEX.MOBILE_MENU};"
		transition:fly={{ x: 300, duration: ANIMATION.SLIDE_DURATION }}
	>
		<!-- Menu Header -->
		<div class="flex justify-between items-center p-4 border-b border-gray-200">
			<span class="text-lg font-medium" style="color: #1d1d1f; font-weight: 600;">Menu</span>
			<button
				onclick={closeMobileMenu}
				class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
				aria-label="Close menu"
				style="color: #1d1d1f;"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Menu Content -->
		<div class="p-4 space-y-6">
			<!-- Products Section -->
			<div>
				<div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Products</div>
				<div class="space-y-4">
					{#each PRODUCT_CATEGORIES as category}
						{@const products = getProductsByCategory(category.name)}
						{#if products.length > 0}
							<div>
								<div class="text-sm font-semibold mb-2 px-4" style="color: #1d1d1f; font-weight: 600;">{category.name}</div>
								<div class="space-y-1">
									{#each products as product}
										<a
											href={product.href}
											onclick={handleProductClick}
											class="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
										>
											<div class="flex items-center gap-3">
												<span class="text-2xl">{product.icon || '📦'}</span>
												<div class="flex-1">
													<div class="font-medium" style="color: #1d1d1f; font-weight: 500;">{product.label}</div>
													{#if product.description}
														<div class="text-sm text-gray-600 mt-0.5" style="font-weight: 400;">{product.description}</div>
													{/if}
												</div>
											</div>
										</a>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Other Links Section -->
			<div>
				<div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">More</div>
				<div class="space-y-1">
					{#each MAIN_NAV_LINKS as { label, href }}
						<a
							{href}
							onclick={closeMobileMenu}
							class="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
							style="color: #1d1d1f; font-weight: 500;"
						>
							{label}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
