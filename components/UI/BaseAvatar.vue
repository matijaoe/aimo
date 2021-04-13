<template>
	<div class="flex-shrink-0">
		<img
			:src="src"
			alt="user avatar"
			class="rounded-full"
			:class="avatarSize"
		/>
	</div>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			default: './default-avatar.png',
		},
		size: {
			type: String,
			default: null,
		},
	},
	computed: {
		avatarSize() {
			if (this.size === 'sm') {
				return ['w-6', 'h-6'];
			} else if (this.size === 'lg') {
				return ['w-12', 'h-12'];
			} else if (this.size === 'xl') {
				return ['w-16', 'h-16'];
			} else if (this.size === 'xxl') {
				return ['w-28', 'h-28'];
			} else {
				return ['w-10 h-10'];
			}
		},
	},
};
</script>
