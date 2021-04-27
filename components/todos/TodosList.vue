<template>
	<div class="text-xl font-light">
		<ul v-if="hasTodos">
			<TodoItem
				v-for="todo in filteredTodos"
				:key="todo.id"
				:categories="todo.categories"
				:partner-id="todo.partner"
				:completed="todo.done"
				:important="todo.important"
				:approved="todo.approved"
				:daily="todo.daily"
			>
				{{ todo.name }}
			</TodoItem>
		</ul>
		<div
			v-else
			class="w-full h-full flex flex-col items-center justify-center gap-12"
		>
			<p class="font-semibold text-5xl">You're fresh outta todos 🙄</p>
			<BaseButton mode="cta">
				<IconPlus />
				Add Todo
			</BaseButton>
		</div>
	</div>
</template>

<script>
import TodoItem from 'todos/TodoItem.vue';
import BaseButton from 'UI/BaseButton.vue';
import IconPlus from 'icons/IconPlus.vue';
import { mapGetters } from 'vuex';

export default {
	components: { TodoItem, BaseButton, IconPlus },
	props: {
		filter: {
			type: String,
			required: true,
		},
		filterCategory: {
			type: String,
			required: true,
		},
		todos: {
			type: Array,
			required: true,
		},
	},
	computed: {
		...mapGetters('todos', [
			'currentUserTodos',
			'importantTodos',
			'completedTodos',
			'approvedTodos',
			'dailyTodos',
			'personalTodos',
			'todosByPartner',
			'todosByTag',
		]),
		filteredTodos() {
			if (this.filterCategory === 'default') {
				return this.defaultCatTodos;
			} else if (this.filterCategory === 'partners') {
				const partnerId = this.filter;
				return this.todos.filter((todo) => todo.partner === partnerId);
			} else if (this.filterCategory === 'tags') {
				const tagId = this.filter;
				return this.todos.filter((todo) =>
					todo.categories.includes(tagId)
				);
			}
			return [];
		},
		defaultCatTodos() {
			const option = this.filter;
			if (option === 'all') return this.todos;
			else if (option === 'approved')
				return this.todos.filter((todo) => todo.approved);
			else if (option === 'completed')
				return this.todos.filter((todo) => todo.done);
			else if (option === 'important')
				return this.todos.filter((todo) => todo.important);
			else if (option === 'daily')
				return this.todos.filter((todo) => todo.daily);
			else if (option === 'personal')
				return this.todos.filter((todo) => !todo.partner);
			return this.todos;
		},
		hasTodos() {
			return this.filteredTodos && this.filteredTodos.length > 0;
		},
	},
};
</script>
