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
				d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
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
