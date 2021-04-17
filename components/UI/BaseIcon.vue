<template>
	<div class="flex-shrink-0" :class="iconSize">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		size: {
			type: String,
			default: 'md',
		},
	},
	computed: {
		iconSize() {
			if (this.size === 'sm') {
				return ['w-4', 'h-4'];
			} else if (this.size === 'md') {
				return ['w-6', 'h-6'];
			} else if (this.size === 'lg') {
				return ['w-8', 'h-8'];
			} else {
				return ['w-6', 'h-6'];
			}
		},
	},
};
</script>
