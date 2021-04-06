<template>
	<nav class="flex flex-col justify-between flex-1 mt-10">
		<ul class="space-y-2">
			<li class="border-b-2 border-dashed border-gray-200 pb-4">
				<SidebarNavLink text="New todo" to="/todos/new" cta>
					<IconAdd />
				</SidebarNavLink>
			</li>
			<li class="pt-2">
				<SidebarNavLink text="Home" to="/">
					<IconHome />
				</SidebarNavLink>
			</li>
			<!-- <li>
				<SidebarNavLink
					text="Profile"
					:to="`/user/${$store.state.userId}`"
				>
					<IconProfile />
				</SidebarNavLink>
			</li> -->
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
				<SidebarNavLink text="Inbox" to="/inbox">
					<IconInbox />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Stats" to="/stats">
					<IconStats />
				</SidebarNavLink>
			</li>
		</ul>
		<div class="space-y-2">
			<SidebarNavLink text="Settings" to="/settings">
				<IconSettings />
			</SidebarNavLink>
			<SidebarNavLink
				:text="userFullName"
				:to="`/user/${$store.state.userId}`"
				class="text-sm"
			>
				<BaseAvatar :src="user.image" />
			</SidebarNavLink>
		</div>
	</nav>
</template>

<script>
import IconHome from 'icons/IconHome.vue';
// import IconProfile from 'icons/IconProfile.vue';
import IconInbox from 'icons/IconInbox.vue';
import IconCommunity from 'icons/IconCommunity.vue';
import IconTodos from 'icons/IconTodos.vue';
import IconStats from 'icons/IconStats.vue';
import IconSettings from 'icons/IconSettings.vue';
import IconAdd from 'icons/IconAdd.vue';
import SidebarNavLink from 'menus/SidebarNavLink.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		IconHome,
		// IconProfile,
		IconInbox,
		IconCommunity,
		IconTodos,
		IconStats,
		IconSettings,
		IconAdd,
		SidebarNavLink,
		BaseAvatar,
	},
	computed: {
		...mapGetters('users', ['users']),
		user() {
			const userId = this.$store.state.userId;
			const currUser = this.users.find(
				(user) => user.username === userId
			);
			if (currUser) {
				return currUser;
			}
			return '';
		},
		userFullName() {
			return `${this.user.fname} ${this.user.lname}`;
		},
	},
};
</script>

<style lang="postcss" scoped>
a.nuxt-link-exact-active {
	@apply bg-gray-200;
}
</style>
