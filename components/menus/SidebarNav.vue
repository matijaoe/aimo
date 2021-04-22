<template>
	<nav class="flex flex-col justify-between flex-1 mt-10">
		<ul class="space-y-2">
			<li class="border-b-2 border-dashed border-gray-200 pb-4">
				<!-- todo - replace with button -->
				<SidebarNavLink
					text="New todo"
					to="/todos/new"
					cta
					exact
					class="cta"
				>
					<IconPlus />
				</SidebarNavLink>
			</li>
			<li class="pt-2">
				<SidebarNavLink text="Home" to="/home">
					<IconHome />
				</SidebarNavLink>
			</li>
			<!-- <li>
				<SidebarNavLink
					text="Profile"
					:to="`/user/${$store.state.userId}`"
				>
					<IconUser />
				</SidebarNavLink>
			</li> -->
			<li>
				<SidebarNavLink text="Community" to="/community">
					<IconUserGroup />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Todos" to="/todos">
					<IconClipboardList />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Todos.new" to="/todos2">
					<IconClipboardList />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Inbox" to="/inbox">
					<IconInbox />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Stats" to="/stats">
					<IconChartBar />
				</SidebarNavLink>
			</li>
		</ul>
		<div class="space-y-2">
			<SidebarNavLink text="Settings" to="/settings">
				<IconSettings />
			</SidebarNavLink>
			<SidebarNavLink
				to="/plans"
				class="text-base"
				tooltip="Switch to Premium"
			>
				<div class="flex flex-col">
					<span
						class="text-gray-400 text-xs uppercase hidden xl:block"
					>
						Your plan
					</span>
					<span>Free</span>
				</div>
			</SidebarNavLink>
		</div>
	</nav>
</template>

<script>
import IconHome from 'icons/IconHome.vue';
import IconUser from 'icons/IconUser.vue';
import IconInbox from 'icons/IconInbox.vue';
import IconUserGroup from 'icons/IconUserGroup.vue';
import IconClipboardList from 'icons/IconClipboardList.vue';
import IconChartBar from 'icons/IconChartBar.vue';
import IconSettings from 'icons/IconSettings.vue';
import IconPlus from 'icons/IconPlus.vue';
import SidebarNavLink from 'menus/SidebarNavLink.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		IconHome,
		// IconUser,
		IconInbox,
		IconUserGroup,
		IconClipboardList,
		IconChartBar,
		IconSettings,
		IconPlus,
		SidebarNavLink,
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
	},
};
</script>

<style lang="postcss" scoped>
a.nuxt-link-active {
	@apply bg-gray-200;
}
/* todo - exact property in nuxt-link */
.cta.nuxt-link-exact-active {
	@apply bg-amber-300;
}
</style>
