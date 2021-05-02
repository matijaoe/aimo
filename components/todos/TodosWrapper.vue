<template>
	<div class="flex-1 bg-gray-100 flex flex-col">
		<TodosSearchbar
			@search="searchTodos"
			@sort="sortTodos"
			@newtodo="openNewTodo"
		/>
		<TodosList
			class="flex-1 overflow-y-auto"
			:filter-category="filterCategory"
			:filter="filter"
			:todos="todos"
			@edit="editTodo"
		/>
		<TodoDetails
			v-if="modalShown"
			:key="todoId"
			:todo-id="todoId"
			@close="modalShown = false"
		/>
	</div>
</template>

<script>
import TodosSearchbar from 'todos/TodosSearchbar.vue';
import TodosList from 'todos/TodosList.vue';
import TodoDetails from 'todos/TodoDetails.vue';
import { orderBy as _orderBy } from 'lodash';

import { mapGetters } from 'vuex';

export default {
	components: {
		TodosSearchbar,
		TodosList,
		TodoDetails,
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
	data() {
		return {
			todos: [],
			modalShown: false,
			todoId: null,
		};
	},
	computed: {
		...mapGetters('todos', ['currentUserTodos']),
		allTodos() {
			return this.currentUserTodos;
		},
	},
	mounted() {
		this.todos = this.allTodos;
	},
	methods: {
		openNewTodo() {
			this.modalShown = true;
		},
		editTodo(id) {
			console.log('EDIT TODO ' + id);
			this.modalShown = true;
			this.todoId = id;
		},
		sortTodos(arg) {
			if (arg === 'asc' || arg === 'desc') {
				this.todos = _orderBy(
					this.allTodos,
					[(todo) => todo.name.toLowerCase()],
					[arg]
				);
			} else {
				this.todos = this.allTodos;
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
