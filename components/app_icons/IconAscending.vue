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
				d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
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
