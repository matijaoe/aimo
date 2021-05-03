<template>
	<nav class="flex flex-col justify-between flex-1 mt-10">
		<ul class="space-y-2">
			<li class="border-b-2 border-dashed border-gray-200 pb-4">
				<!-- todo - replace with button -->
				<SidebarNavLink
					text="New todo"
					:to="{ name: 'todos', query: { new: 'true' } }"
					cta
					exact
					class="cta"
				>
					<IconPlus />
				</SidebarNavLink>
			</li>
			<li class="pt-2">
				<SidebarNavLink text="Home" :to="{ name: 'home' }">
					<IconHome />
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
				<SidebarNavLink text="Inbox" :to="{ name: 'inbox' }">
					<IconInbox />
				</SidebarNavLink>
			</li>
			<li>
				<SidebarNavLink text="Stats" :to="{ name: 'stats' }">
					<IconChartBar />
				</SidebarNavLink>
			</li>
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
				<div class="flex flex-col">
					<span
						class="text-gray-400 text-xs uppercase hidden xl:block"
					>
						Your plan
					</span>
					<span>{{ currentPlan }}</span>
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
import IconChartBar from 'icons/IconChartBar.vue';
import IconSettings from 'icons/IconSettings.vue';
import IconPlus from 'icons/IconPlus.vue';
import SidebarNavLink from 'menus/SidebarNavLink.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		IconHome,
		IconInbox,
		IconUserGroup,
		IconClipboardList,
		IconChartBar,
		IconSettings,
		IconPlus,
		SidebarNavLink,
	},
	computed: {
		...mapGetters(['currentUser']),
		currentPlan() {
			const isPremium = this.currentUser.isPremium;
			return isPremium ? 'Premium' : 'Free';
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
