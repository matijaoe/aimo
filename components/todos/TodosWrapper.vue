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
			:todos="allTodos"
			@edit="editTodo"
			@newtodo="openNewTodo"
		/>
		<transition name="fade">
			<TodoDetails
				v-if="modalShown"
				:key="todoId"
				:todo-id="todoId"
				@close="closeNewTodo"
			/>
		</transition>
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
			term: '',
			sortArg: '',
		};
	},
	computed: {
		...mapGetters('todos', ['currentUserTodos']),
		allTodos() {
			const allTodos = this.currentUserTodos.filter((todo) => {
				return todo.name
					.toLowerCase()
					.includes(this.term.toLowerCase());
			});
			if (this.sortArg === 'asc' || this.sortArg === 'desc') {
				return _orderBy(
					allTodos,
					[(todo) => todo.name.toLowerCase()],
					[this.sortArg]
				);
			}
			return allTodos;
		},
	},
	mounted() {
		const isNew = this.$route.query.new;
		if (isNew) {
			this.modalShown = true;
			this.todoId = null;
		}
	},

	methods: {
		openNewTodo() {
			this.modalShown = true;
		},
		closeNewTodo() {
			this.modalShown = false;
			this.todoId = null;
		},
		editTodo(id) {
			this.modalShown = true;
			this.todoId = id;
		},
		sortTodos(arg) {
			this.sortArg = arg;
		},
		searchTodos(term) {
			this.term = term;
		},
	},
};
</script>
