<template>
	<aside class="border-r-2 border-gray-100 space-y-5 pb-4">
		<div class="mb-6 p-1 md:p-4">
			<BaseButton
				mode="cta"
				class="w-full py-2 hidden md:block"
				thin
				@click="$emit('new-todo')"
			>
				<IconPlus />
				<span>Add todo</span>
			</BaseButton>
			<BaseButton
				mode="cta"
				class="w-full py-2 block md:hidden"
				thin
				square
				@click="$emit('new-todo')"
			>
				<IconPlus />
			</BaseButton>
		</div>

		<ul class="space-y-0.5">
			<TodosSidebarLink :to="{ path: '/todos' }">
				<IconClipboardList size="sm" />
				<span>All</span>
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/todos/inprogress' }">
				<IconClock size="sm" />
				<span>In progress</span>
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/todos/completed' }">
				<IconCheckCircle size="sm" />
				<span>Completed</span>
			</TodosSidebarLink>
			<TodosSidebarLink :to="{ path: '/todos/approved' }">
				<IconShieldCheck size="sm" class="text-current" />
				<span>Approved</span>
			</TodosSidebarLink>
		</ul>

		<div>
			<h3 class="title">Filters</h3>
			<ul class="space-y-0.5">
				<TodosSidebarLink :to="{ path: '/todos/important' }">
					<IconStar size="sm" />
					<span>Important</span>
				</TodosSidebarLink>
				<TodosSidebarLink :to="{ path: '/todos/daily' }">
					<IconGlobeAlt size="sm" />
					<span>Daily</span>
				</TodosSidebarLink>
				<TodosSidebarLink :to="{ path: '/todos/personal' }">
					<IconUserCircle size="sm" />
					<span>Personal</span>
				</TodosSidebarLink>
			</ul>
		</div>
		<div class="space-y-2">
			<h3 class="title">Partners</h3>
			<ul v-if="partners.length > 0" class="space-y-0.5">
				<TodosSidebarLink
					v-for="partner in partners"
					:key="partner.username"
					:to="{ path: `/todos/partners/${partner.username}` }"
					class="text-[12px] flex-col"
				>
					<BaseAvatar size="xs" :src="partner.photo" />
					<span>{{ partner.fname }}</span>
				</TodosSidebarLink>
			</ul>
			<div v-else class="mx-2 px-3 py-1">
				<BaseTag>No partners found</BaseTag>
			</div>
		</div>
		<div class="space-y-2">
			<h3 class="title">Tags</h3>
			<ul v-if="tags.length > 0" class="space-y-0.5">
				<TodosSidebarLink
					v-for="tag in tags"
					:key="tag.id"
					:to="{
						path: `/todos/tag/${tag.name}`,
					}"
					class="text-[12px]"
				>
					<BaseTag :color="tag.color">
						{{ tag.name }}
					</BaseTag>
				</TodosSidebarLink>
			</ul>
			<div v-else class="mx-2 px-3 py-1">
				<BaseTag>No categories found</BaseTag>
			</div>
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
		IconPlus,
		IconClipboardList,
		IconStar,
		IconGlobeAlt,
		IconUserCircle,
		IconCheckCircle,
		IconShieldCheck,
		BaseButton,
		BaseAvatar,
		BaseTag,
		TodosSidebarLink,
		IconClock,
	},
	emits: ['newtodo'],
	computed: {
		...mapGetters(['currentUserId']),
		...mapGetters('todos', ['activeTags', 'getCurrentUserTodoPartners']),
		partners() {
			return this.getCurrentUserTodoPartners;
		},
		tags() {
			return this.activeTags;
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
