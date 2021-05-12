<template>
	<nav class="flex flex-col justify-between flex-1 mt-10">
		<ul class="space-y-2">
			<li class="pt-2">
				<SidebarNavLink text="Home" :to="{ name: 'home' }">
					<IconHome />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink
					text="Profile"
					:to="{ path: `/user/${$store.getters.currentUserId}` }"
				>
					<IconUser />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Community" :to="{ name: 'community' }">
					<IconUserGroup />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Todos" :to="{ name: 'todos' }">
					<IconClipboardList />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Reviews" :to="{ name: 'reviews' }">
					<IconClipboardCheck />
				</SidebarNavLink>
			</li>
			<!-- <li>
				<SidebarNavLink text="Inbox" :to="{ name: 'inbox' }">
					<IconInbox />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Stats" :to="{ name: 'stats' }">
					<IconChartBar />
				</SidebarNavLink>
			</li> -->
		</ul>
		<div class="space-y-2 mt-10">
			<SidebarNavLink text="Settings" :to="{ name: 'settings' }">
				<IconSettings />
			</SidebarNavLink>
			<SidebarNavLink
				:to="{ name: 'plans' }"
				class="text-base"
				tooltip="Switch to Premium"
			>
				<div v-if="currentUser" class="hidden xl:flex flex-col">
					<span class="text-gray-400 text-xs uppercase">
						Your plan
					</span>
					<span class="hidden xl:block">{{ currentPlan }}</span>
				</div>
			</SidebarNavLink>
		</div>
	</nav>
</template>

<script>
import IconHome from 'icons/IconHome.vue';
import IconInbox from 'icons/IconInbox.vue';
import IconUserGroup from 'icons/IconUserGroup.vue';
import IconClipboardList from 'icons/IconClipboardList.vue';
import IconClipboardCheck from 'icons/IconClipboardCheck';
import IconUser from 'icons/IconUser.vue';
import IconChartBar from 'icons/IconChartBar.vue';
import IconSettings from 'icons/IconSettings.vue';
import SidebarNavLink from 'menus/SidebarNavLink.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		IconClipboardCheck,
		IconHome,
		// IconInbox,
		IconUserGroup,
		IconClipboardList,
		IconUser,
		// IconChartBar,
		IconSettings,
		SidebarNavLink,
	},
	computed: {
		...mapGetters(['currentUser']),
		currentPlan() {
			const isPremium = this.currentUser.isPremium;
			return isPremium ? 'Premium' : 'Free';
		},
	},
	methods: {
		toggleNewTodo() {
			this.$router.push('/todos?newtodo=true');
		},
	},
};
</script>

<style lang="postcss" scoped>
a.nuxt-link-active {
	@apply bg-gray-200;
}
.cta.nuxt-link-exact-active {
	@apply bg-amber-300;
}
</style>
