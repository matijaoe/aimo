<template>
	<aside class="border-r-2 border-gray-100 space-y-5">
		<div class="mb-6 p-4">
			<BaseButton mode="cta" class="w-full py-2" thin>
				<IconPlus />
				Add Todo
			</BaseButton>
		</div>

		<ul class="space-y-0.5">
			<TodosSidebarLink to="/todos2?filter=all">
				<IconClipboardList size="sm" />
				All
			</TodosSidebarLink>
			<TodosSidebarLink to="/todos2?filter=completed">
				<IconCheck size="sm" />
				Completed
			</TodosSidebarLink>
		</ul>

		<div>
			<h3 class="title">Filters</h3>
			<ul class="space-y-0.5">
				<TodosSidebarLink to="/todos2?filter=favorites">
					<IconStar size="sm" />
					Favorites
				</TodosSidebarLink>
				<TodosSidebarLink to="/todos2?filter=daily">
					<IconSun size="sm" />
					Daily
				</TodosSidebarLink>
				<TodosSidebarLink to="/todos2?filter=personal">
					<IconHeart size="sm" />
					Personal
				</TodosSidebarLink>
			</ul>
		</div>
		<div class="space-y-2">
			<h3 class="title">Partners</h3>
			<ul class="space-y-0.5">
				<TodosSidebarLink
					v-for="partner in partners"
					:key="partner.username"
					:to="`/todos/partners/${partner.username}`"
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
import IconSun from 'icons/IconSun.vue';
import IconHeart from 'icons/IconHeart.vue';
import IconCheck from 'icons/IconCheck.vue';
import BaseButton from 'UI/BaseButton.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';
import TodosSidebarLink from './TodosSidebarLink.vue';

export default {
	components: {
		IconPlus,
		IconClipboardList,
		IconStar,
		IconSun,
		IconHeart,
		IconCheck,
		BaseButton,
		BaseAvatar,
		TodosSidebarLink,
	},
	props: {
		partners: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="postcss" scoped>
.title {
	@apply text-gray-300 opacity-75 mb-1 font-normal uppercase text-xs pl-4;
}
a.nuxt-link-active {
	/* @apply bg-gray-200; */
}
/* todo - exact property in nuxt-link */
.cta.nuxt-link-exact-active {
	/* @apply bg-amber-300; */
}
</style>
