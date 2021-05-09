<template>
	<section class="space-y-10">
		<div class="flex gap-2 max-w-sm flex-wrap">
			<BaseTag v-for="color in colors" :key="color" :color="color">
				{{ color }}
			</BaseTag>
		</div>
	</section>
</template>

<script>
import BaseTag from 'UI/BaseTag.vue';

export default {
	components: {
		BaseTag,
	},
	data() {
		return {
			show: true,
			colors: [
				'gray',
				'coolGray',
				'red',
				'orange',
				'amber',
				'yellow',
				'lime',
				'green',
				'emerald',
				'teal',
				'cyan',
				'lightBlue',
				'blue',
				'indigo',
				'violet',
				'purple',
				'fuchsia',
				'pink',
				'rose',
			],
		};
	},
	methods: {
		toggleShow() {
			this.show = !this.show;
		},
	},
};
</script>
