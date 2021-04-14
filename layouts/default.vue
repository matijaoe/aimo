<template>
	<div
		class="flex min-h-screen overflow-x-hidden font-primary text-gray-800 text-sm"
	>
		<AppSidebar class="w-16 md:w-56 lg:w-64 2xl:w-72" />
		<div
			class="w-full min-h-screen px-4 md:px-8 pt-2 pb-8 sm:pt-5 sm:ml-16 md:ml-56 lg:ml-64 2xl:ml-72 bg-white"
		>
			<div class="max-w-7xl mx-auto">
				<TheHeader />
				<main class="mt-8 h-full">
					<Nuxt />
				</main>
			</div>
		</div>
		<TheStatusbar />
	</div>
</template>

<script>
import AppSidebar from 'menus/AppSidebar.vue';
import TheHeader from 'layout/TheHeader.vue';
import TheStatusbar from 'layout/TheStatusbar.vue';

export default {
	components: {
		AppSidebar,
		TheHeader,
		TheStatusbar,
	},
};
</script>

<style lang="postcss"></style>
