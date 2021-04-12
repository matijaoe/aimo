<template>
	<BaseIcon class="rotate" :size="size">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
			<line
				x1="15"
				y1="15"
				x2="25"
				y2="25"
				stroke="#1e293b"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-miterlimit="10"
				class="text-gray-800"
			></line>
			<line
				x1="25"
				y1="15"
				x2="15"
				y2="25"
				stroke="#1e293b"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-miterlimit="10"
			></line>
			<circle
				class="circle"
				cx="20"
				cy="20"
				r="19"
				opacity="0"
				stroke="#1e293b"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-miterlimit="10"
				fill="none"
			></circle>
			<path
				d="M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z"
				class="progress"
				stroke="#1e293b"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-miterlimit="10"
				fill="none"
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

<style scoped>
.rotate {
	transform: rotate(0);
	transition: all 0.3s ease;
}
.rotate:hover {
	transform: rotate(-90deg);
}
</style>
