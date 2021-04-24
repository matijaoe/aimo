<template>
	<li
		v-tooltip.top="tooltip"
		class="border-l-4 border-transparent hover:border-amber-300 hover:bg-amber-50"
		:class="linkStyle"
	>
		<NuxtLink
			:to="to"
			class="flex items-center gap-2 px-4 py-1 rounded-lg text-gray-700 hover:text-gray-900 transition group"
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
	computed: {
		linkStyle() {
			if (this.to.path === this.$route.fullPath) {
				return 'border-amber-300 bg-amber-50';
			}
			return '';
		},
	},
};
</script>
