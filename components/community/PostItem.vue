<template>
	<BaseContainer class="p-1" :class="[spanCalc]">
		<PostHeader :todo="todo" />
		<PostDetails :todo="todo" />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import { mapGetters } from 'vuex';
import PostHeader from './PostHeader';
import PostDetails from './PostDetails';
export default {
	components: { PostDetails, PostHeader, BaseContainer },
	props: {
		todo: {
			type: Object,
			required: true,
		},
		index: {
			type: Number,
			required: false,
			default: 1,
		},
	},
	computed: {
		...mapGetters(['getCategoryById']),
		spanCalc() {
			const inx = this.index;
			if (inx % 3 === 0) return 'col-span-4';
			return 'col-span-2';
			/*
			if (inx >= 10) inx = inx % 10;
			console.log(inx);
			if ([0, 5].includes(inx)) return 'col-span-4';
			else if ([1, 9].includes(inx)) return 'col-span-3';
			else if ([3, 4, 6, 7].includes(inx)) return 'row-span-2';
			return 'col-span-1';
			*/
		},
		backgroundColor() {
			const len = this.todo.categories.length;
			if (len > 0) {
				const randNum = Math.floor(Math.random() * len);
				const color = this.getCategoryById(
					this.todo.categories[randNum]
				).color;
				return `bg-${color}-100 bg-opacity-30`;
			}
			return '';
		},
	},
};
</script>
