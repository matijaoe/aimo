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
			} else {
				return ['w-10 h-10'];
			}
		},
	},
};
</script>
