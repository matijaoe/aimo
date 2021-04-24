<template>
	<div class="flex-1 bg-gray-100 flex flex-col">
		<TodosSearchbar @search="searchTodos" @sort="sortTodos" />
		<TodosMain
			class="flex-1 overflow-y-auto"
			:filter-category="filterCategory"
			:filter="filter"
		/>
	</div>
</template>

<script>
import TodosSearchbar from 'todos/TodosSearchbar.vue';
import TodosMain from 'todos/TodosMain.vue';
import { orderBy as _orderBy } from 'lodash';
export default {
	components: {
		TodosSearchbar,
		TodosMain,
	},
	props: {
		filter: {
			type: String,
			required: false,
			default: 'all',
		},
		filterCategory: {
			type: String,
			required: false,
			default: 'default',
		},
	},
	methods: {
		sortTodos(arg) {
			if (arg === 'asc' || arg === 'desc') {
				this.todos = _orderBy(
					this.todos,
					[(todo) => todo.name.toLowerCase()],
					[arg]
				);
			} else {
				this.todos = this.currentUser.todos;
			}
		},
		searchTodos(term) {
			this.todos = this.allTodos.filter((todo) => {
				return todo.name.toLowerCase().includes(term.toLowerCase());
			});
		},
	},
};
</script>
