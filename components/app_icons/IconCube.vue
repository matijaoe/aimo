<template>
	<BaseIcon :size="size">
		<svg
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
			></path>
		</svg>
	</BaseIcon>
</template>

<script>
import BaseIcon from 'UI/BaseIcon.vue';

export default {
	components: {
		BaseIcon,
	},
	props: {
		size: {
			type: String,
			default: 'md',
		},
	},
};
</script>
