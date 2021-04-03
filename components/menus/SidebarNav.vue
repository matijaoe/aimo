<template>
	<nav class="flex flex-col justify-between flex-1 mt-10">
		<ul class="space-y-2">
			<li>
				<SidebarNavLink text="Home" to="/">
					<IconHome />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Profile" to="/profile">
					<IconProfile />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Inbox" to="/inbox">
					<IconInbox />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Community" to="/community">
					<IconCommunity />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Todos" to="/todos">
					<IconTodos />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Stats" to="/stats">
					<IconStats />
				</SidebarNavLink>
			</li>
		</ul>
		<div>
			<SidebarNavLink text="Settings" to="/settings">
				<IconSettings />
			</SidebarNavLink>
		</div>
	</nav>
</template>

<script>
import IconHome from 'icons/IconHome.vue';
import IconProfile from 'icons/IconProfile.vue';
import IconInbox from 'icons/IconInbox.vue';
import IconCommunity from 'icons/IconCommunity.vue';
import IconTodos from 'icons/IconTodos.vue';
import IconStats from 'icons/IconStats.vue';
import IconSettings from 'icons/IconSettings.vue';
import SidebarNavLink from 'menus/SidebarNavLink.vue';

export default {
	components: {
		IconHome,
		IconProfile,
		IconInbox,
		IconCommunity,
		IconTodos,
		IconStats,
		IconSettings,
		SidebarNavLink,
	},
};
</script>

<style lang="postcss" scoped>
a.nuxt-link-exact-active {
	@apply bg-gray-200;
}
</style>
