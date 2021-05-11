<template>
	<aside
		class="fixed flex-col flex-shrink-0 min-h-screen col-span-2 px-2 xl:px-6 pt-5 xl:pt-10 xs:pb-4 xl:pb-10 border-r-2 bg-gray-50 border-gray-100"
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
