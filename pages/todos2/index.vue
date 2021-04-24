<template>
	<BaseContainer class="flex custom-height" no-padding>
		<TodosSidebar
			class="w-[200px] overflow-y-auto flex-shrink-0"
			:partners="partners"
		/>
		<div class="flex-1 bg-gray-100 flex flex-col">
			<TodosSearchbar @search="searchTodos" @sort="sortTodos" />
			<TodosMain class="flex-1 overflow-y-auto" :todos="todos" />
		</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import TodosSidebar from 'todos/new/TodosSidebar.vue';
import TodosSearchbar from 'todos/new/TodosSearchbar.vue';
import TodosMain from 'todos/new/TodosMain.vue';

import { mapGetters } from 'vuex';
import { orderBy as _orderBy } from 'lodash';

export default {
	components: {
		BaseContainer,
		TodosSidebar,
		TodosSearchbar,
		TodosMain,
	},
	data() {
		return {
			todos: [],
		};
	},

	computed: {
		...mapGetters(['currentUser', 'currentUserId']),
		...mapGetters('partners', ['getPartnersById']),
		partners() {
			return this.getPartnersById(this.currentUserId);
		},
		allTodos() {
			return this.currentUser.todos;
		},
	},
	created() {
		this.todos = this.allTodos;
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

<style scoped>
.custom-height {
	height: calc(100vh - 9rem);
}
</style>
