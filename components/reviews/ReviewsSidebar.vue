<template>
	<aside class="border-r-2 border-gray-100 space-y-5 pb-4">
		<ul class="space-y-0.5">
			<TodosSidebarLink :to="{ path: '/reviews' }">
				<IconClipboardList size="sm" />
				<span>All</span>
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/reviews/inprogress' }">
				<IconClock size="sm" />
				<span>In progress</span>
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/reviews/completed' }">
				<IconCheckCircle size="sm" />
				<span>Completed</span>
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/reviews/approved' }">
				<IconShieldCheck size="sm" class="text-current" />
				<span>Approved</span>
			</TodosSidebarLink>
		</ul>
		<div class="space-y-2">
			<h3 class="title">Partners</h3>
			<ul v-if="partners.length > 0" class="space-y-0.5">
				<TodosSidebarLink
					v-for="partner in partners"
					:key="partner.username"
					:to="{ path: `/reviews/partners/${partner.username}` }"
					class="text-[12px]"
				>
					<BaseAvatar size="xs" :src="partner.photo" />
					<span>{{ partner.fname }}</span>
				</TodosSidebarLink>
			</ul>
			<div v-else class="mx-2 px-3 py-1 text-center">
				<BaseTag>No partners found</BaseTag>
			</div>
		</div>
	</aside>
</template>

<script>
import IconClipboardList from 'icons/IconClipboardList.vue';
import IconCheckCircle from 'icons/IconCheckCircle.vue';
import IconShieldCheck from 'icons/IconShieldCheck.vue';
import IconClock from 'icons/IconClock.vue';
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
		BaseTag,
		TodosSidebarLink,
		IconClock,
	},
	computed: {
		...mapGetters(['currentUserId']),
		...mapGetters('reviews', ['activeReviewPartners']),
		partners() {
			return this.activeReviewPartners;
		},
	},
};
</script>

<style lang="postcss" scoped>
.title {
	@apply text-gray-300 opacity-75 mb-1 font-normal uppercase text-xs pl-4;
	@apply hidden md:block;
}

aside span {
	@apply hidden md:block;
}
</style>
