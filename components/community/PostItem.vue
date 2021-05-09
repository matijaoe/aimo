<template>
	<BaseContainer class="space-y-2">
		<PostHeader :todo="todo" />
		<PostDetails :todo="todo" />
		<PostOptions />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import { mapGetters } from 'vuex';
import PostHeader from './PostHeader';
import PostDetails from './PostDetails';
import PostOptions from './PostOptions';

export default {
	components: {
		PostDetails,
		PostOptions,
		PostHeader,
		BaseContainer,
	},
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
