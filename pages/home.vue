<template>
	<section class="space-y-10">
		<h1 class="text-5xl">Homepage</h1>
		<div class="flex gap-4">
			<BaseButton mode="cta" @click="toggleShow">cta</BaseButton>
			<BaseButton mode="fill--color">fill--color</BaseButton>
			<BaseButton mode="fill">fill</BaseButton>
			<BaseButton mode="ghost">ghost</BaseButton>
			<BaseButton>Regular</BaseButton>
			<BaseButton mode="bland">bland</BaseButton>
		</div>
		<div class="flex gap-2 max-w-sm flex-wrap">
			<BaseTag v-for="color in colors" :key="color" :color="color">
				{{ color }}
			</BaseTag>
		</div>
	</section>
</template>

<script>
import BaseButton from 'UI/BaseButton.vue';
import BaseTag from 'UI/BaseTag.vue';

export default {
	components: {
		BaseButton,
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
