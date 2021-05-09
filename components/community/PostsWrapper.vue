<template>
	<div class="grid md:grid-cols-3 gap-4 overflow-hidden custom-height">
		<PostsList :todos="filteredTodos" class="col-span-2" />
		<CommunitySidebar class="hidden md:block" :category="category" />
	</div>
</template>

<script>
import CommunitySidebar from './CommunitySidebar';
import PostsList from './PostsList';

export default {
	components: {
		PostsList,
		CommunitySidebar,
	},
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

<style scoped lang="postcss">
.custom-height {
	height: calc(100vh - 9rem);
	@apply overflow-y-auto;
}
</style>
