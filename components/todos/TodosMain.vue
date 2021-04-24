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
				:daily="todo.isDaily"
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
	},
	computed: {
		...mapGetters('todos', [
			'allTodos',
			'importantTodos',
			'completedTodos',
			'approvedTodos',
			'dailyTodos',
			'personalTodos',
			'todosByPartner',
		]),
		filteredTodos() {
			if (this.filterCategory === 'default') {
				const todoGetterString = `${this.filter}Todos`;
				return this[todoGetterString];
			} else if (this.filterCategory === 'partners') {
				return this.todosByPartner(this.filter);
			}
			return [];
		},
		hasTodos() {
			return this.filteredTodos && this.filteredTodos.length > 0;
		},
	},
};
</script>
