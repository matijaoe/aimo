<template>
	<div class="grid grid-cols-3 gap-4 overflow-hidden">
		<PostsList :todos="filteredTodos" class="col-span-2 custom-height" />
		<CommunitySidebar class="custom-height" :category="category" />
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
	max-height: calc(100vh - 9rem);
	@apply overflow-y-auto;
}
</style>
