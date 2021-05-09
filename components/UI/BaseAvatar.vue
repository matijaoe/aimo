<template>
	<div v-if="!link" class="flex-shrink-0 rounded-full">
		<img
			:src="src"
			alt="user avatar"
			class="rounded-full object-cover"
			:class="[avatarSize]"
		/>
	</div>
	<nuxt-link v-else class="flex-shrink-0 rounded-full" :to="to">
		<img
			:src="src"
			alt="user avatar"
			class="rounded-full object-cover"
			:class="[avatarSize]"
		/>
	</nuxt-link>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			default: '/default-avatar.png',
		},
		size: {
			type: String,
			default: null,
		},
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: Object,
			required: false,
			default: () => ({
				name: 'home',
			}),
		},
	},
	computed: {
		avatarSize() {
			if (this.size === 'xs') {
				return ['w-6', 'h-6'];
			} else if (this.size === 'sm') {
				return ['w-8', 'h-8'];
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
