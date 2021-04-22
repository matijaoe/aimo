<template>
	<BaseContainer class="flex adaptive-height" no-padding>
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
import { nanoid } from 'nanoid';

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
	},
	created() {
		this.todos = this.currentUser.todos;
	},
	methods: {
		allTodos() {
			this.todos = this.currentUser.todos;
		},
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
		searchTodos() {},
	},
};
</script>

<style scoped>
.adaptive-height {
	height: calc(100vh - 40px - 2rem - 2rem - 22px - 1rem);
}
</style>
