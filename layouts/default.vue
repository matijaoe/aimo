<template>
	<div class="flex min-h-screen overflow-x-hidden font-primary text-gray-800">
		<AppSidebar />
		<main
			class="w-full min-h-screen px-4 md:px-8 pt-4 pb-8 sm:pt-8 sm:ml-16 md:ml-56 lg:ml-64 bg-white"
		>
			<Nuxt />
		</main>
		<TheStatusbar />
	</div>
</template>

<script>
import TheStatusbar from 'layout/TheStatusbar.vue';
import AppSidebar from 'menus/AppSidebar.vue';

export default {
	components: {
		AppSidebar,
		TheStatusbar,
	},
};
</script>
