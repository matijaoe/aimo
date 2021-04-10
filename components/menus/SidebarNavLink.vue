<template>
	<NuxtLink
		v-tooltip.right-start="text || tooltip"
		:to="to"
		class="flex items-center justify-center md:justify-start px-2 md:px-4 py-2 space-x-4 text-base rounded-lg"
		:class="bgStyle"
	>
		<slot></slot>
		<span v-if="text" class="hidden md:block">{{ text }}</span>
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
				return ['bg-teal-300'];
			} else {
				return ['bg-transparent', 'hover:bg-gray-100'];
			}
		},
	},
};
</script>
