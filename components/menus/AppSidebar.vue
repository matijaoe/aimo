<template>
	<aside
		class="fixed flex-col flex-shrink-0 h-screen col-span-2 px-2 lg:px-6 pt-5 lg:pt-10 pb-10 border-r-2 bg-gray-50 border-gray-100 font-medium"
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
