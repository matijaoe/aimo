<template>
	<aside
		class="fixed hidden sm:flex flex-col flex-shrink-0 w-16 md:w-56 lg:w-64 h-screen col-span-2 px-2 md:px-8 lg:px-6 pt-8 pb-10 border-r-2 bg-gray-50 border-gray-200 font-medium"
	>
		<SidebarLogo />
		<SidebarNav />
	</aside>
</template>

<script>
import SidebarLogo from 'menus/SidebarLogo.vue';
import SidebarNav from 'menus/SidebarNav.vue';

export default {
	components: {
		SidebarLogo,
		SidebarNav,
	},
};
</script>
