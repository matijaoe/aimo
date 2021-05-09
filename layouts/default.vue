<template>
	<div
		class="flex min-h-screen overflow-hidden font-primary text-gray-700 text-sm font-medium"
	>
		<AppSidebar class="hidden xs:flex w-16 xl:w-64 3xl:w-72" />
		<div
			class="w-full px-4 sm:px-6 lg:px-10 pt-4 pb-8 xs:pt-5 xs:ml-16 xl:ml-64 3xl:ml-72 bg-gray-50 bg-opacity-40"
		>
			<div class="max-w-[1440px] mx-auto h-full">
				<TheHeader />
				<main class="mt-8 h-full">
					<Nuxt />
				</main>
			</div>
		</div>
		<TheStatusbar class="hidden xs:block" />
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
