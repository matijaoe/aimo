<template>
	<PostsList :todos="filteredTodos" />
</template>

<script>
import PostsList from './PostsList';
export default {
	components: { PostsList },
	props: {
		todos: {
			type: Array,
			required: true,
		},
		category: {
			type: Object,
			required: false,
			default: null,
		},
	},
	computed: {
		filteredTodos() {
			if (this.category) {
				return this.todos.filter((todo) =>
					todo.categories.includes(this.category.id)
				);
			}
			return this.todos;
		},
	},
};
</script>
