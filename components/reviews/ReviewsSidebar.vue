<template>
	<aside class="border-r-2 border-gray-100 space-y-5 pb-4">
		<ul class="space-y-0.5">
			<TodosSidebarLink :to="{ path: '/reviews' }">
				<IconClipboardList size="sm" />
				All
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/reviews/inprogress' }">
				<IconClock size="sm" />
				In progress
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/reviews/completed' }">
				<IconCheckCircle size="sm" />
				Completed
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/reviews/approved' }">
				<IconShieldCheck size="sm" class="text-current" />
				Approved
			</TodosSidebarLink>
		</ul>
		<div class="space-y-2">
			<h3 class="title">Partners</h3>
			<ul class="space-y-0.5">
				<TodosSidebarLink
					v-for="partner in partners"
					:key="partner.username"
					:to="{ path: `/reviews/partners/${partner.username}` }"
					class="text-[12px]"
				>
					<BaseAvatar size="xs" :src="partner.photo" />
					{{ partner.fname }}
				</TodosSidebarLink>
			</ul>
		</div>
	</aside>
</template>

<script>
import IconPlus from 'icons/IconPlus.vue';
import IconClipboardList from 'icons/IconClipboardList.vue';
import IconStar from 'icons/IconStar.vue';
import IconGlobeAlt from 'icons/IconGlobeAlt.vue';
import IconUserCircle from 'icons/IconUserCircle.vue';
import IconCheckCircle from 'icons/IconCheckCircle.vue';
import IconShieldCheck from 'icons/IconShieldCheck.vue';
import IconClock from 'icons/IconClock.vue';
import BaseButton from 'UI/BaseButton.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseTag from 'UI/BaseTag.vue';
import TodosSidebarLink from 'todos/TodosSidebarLink.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		IconClipboardList,
		IconCheckCircle,
		IconShieldCheck,
		BaseAvatar,
		TodosSidebarLink,
		IconClock,
	},
	emits: ['newtodo'],
	computed: {
		...mapGetters(['currentUserId']),
		...mapGetters('todos', ['getCurrentUserTodoPartners']),
		partners() {
			return this.getCurrentUserTodoPartners;
		},
	},
};
</script>

<style lang="postcss" scoped>
.title {
	@apply text-gray-300 opacity-75 mb-1 font-normal uppercase text-xs pl-4;
}
</style>
