<template>
	<div class="mt-4 flex flex-col gap-2">
		<TodoItem
			v-for="todo in filteredTodos"
			:key="todo.id"
			:todo-id="todo.id"
			:title="todo.title"
			:partner="todo.partner"
			:desc="todo.desc"
		/>
	</div>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
	components: { TodoItem },
	props: {
		filterOption: {
			type: String,
			required: true,
		},
		filterAttr: {
			type: String,
			required: false,
			default: 'all',
		},
	},
	computed: {
		todos() {
			return this.$store.getters['todos/allTodos'];
		},
		filteredTodos() {
			if (this.filterOption === 'default') {
				return this.todos;
			} else if (this.filterOption === 'partners') {
				return this.todos.filter(
					(todo) => todo.partner === this.filterAttr
				);
			}
			return this.todos;
		},
	},
};
</script>
