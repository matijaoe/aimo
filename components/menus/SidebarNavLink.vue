<template>
	<NuxtLink
		v-tooltip.right-start="text"
		:to="to"
		class="flex items-center justify-center md:justify-start px-2 md:px-4 py-2 space-x-4 text-base rounded-lg"
		:class="bgStyle"
	>
		<slot></slot>
		<span class="hidden md:block">{{ text }}</span>
	</NuxtLink>
</template>

<script>
export default {
	props: {
		text: String,
		to: String,
		cta: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {
		bgStyle() {
			if (this.cta) {
				return ['bg-yellow-300'];
			} else {
				return ['bg-transparent', 'hover:bg-gray-100'];
			}
		},
	},
};
</script>
