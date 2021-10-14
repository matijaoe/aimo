<template>
	<NuxtLink
		v-tooltip.right="tooltip || text"
		:to="to"
		class="
			flex
			items-center
			justify-center
			xl:justify-start
			px-2
			md:px-4
			py-2
			space-x-4
			text-base
			rounded-lg
			focus:outline-none focus:border-none
			max-w-[225px]
			mx-auto
		"
		:class="bgStyle"
	>
		<slot />
		<span v-if="text" class="hidden xl:block">{{ text }}</span>
	</NuxtLink>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: false,
		},
		tooltip: {
			type: String,
			required: false,
		},
		to: {
			type: Object,
			required: true,
			default: () => {
				return { name: 'todos' };
			},
		},
		cta: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {
		bgStyle() {
			if (this.cta) {
				return ['bg-amber-300 text-amber-900'];
			} else {
				return [
					'bg-transparent',
					'hover:bg-gray-100',
					'focus:bg-gray-100',
				];
			}
		},
	},
};
</script>
