<template>
	<li v-tooltip.top="tooltip" class="border-transparent">
		<NuxtLink
			:to="to"
			class="flex items-center justify-center md:justify-start mx-2 px-1 md:px-3 gap-2 py-1 text-gray-700 hover:text-gray-900 transition group hover:border-amber-300 hover:bg-amber-50 rounded-lg"
		>
			<slot />
		</NuxtLink>
	</li>
</template>

<script>
export default {
	props: {
		to: {
			type: Object,
			required: true,
			default: () => {
				return { path: '/todos' };
			},
		},
		tooltip: {
			type: String,
			required: false,
			default: '',
		},
	},
};
</script>

<style lang="postcss" scoped>
a.nuxt-link-exact-active {
	@apply text-amber-900 bg-amber-50;
}
</style>
