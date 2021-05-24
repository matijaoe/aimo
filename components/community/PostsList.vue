<template>
	<ul class="flex flex-col gap-4 overflow-y-auto pb-2 pr-2">
		<PostItem v-for="todo in sortedTodos" :key="todo.id" :todo="todo" />
	</ul>
</template>

<script>
import PostItem from './PostItem';

export default {
	components: { PostItem },
	props: {
		todos: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			sortedTodos: [],
		};
	},
	created() {
		const sortedTodos = this.todos;
		sortedTodos.sort((a, b) => b.numberOfLikes - a.numberOfLikes);
		this.sortedTodos = sortedTodos;
	},
};
</script>
