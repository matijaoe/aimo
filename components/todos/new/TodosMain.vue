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
import TodoItem from 'todos/new/TodoItem.vue';
import BaseButton from 'UI/BaseButton.vue';
import IconPlus from 'icons/IconPlus.vue';
import { mapGetters } from 'vuex';

export default {
	components: { TodoItem, BaseButton, IconPlus },
	props: {
		todos: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		...mapGetters(['currentUserTodos']),
		filteredTodos() {
			const queryFilter = this.$route.query.filter;
			if (queryFilter === 'important') {
				return this.todos.filter((todo) => todo.important);
			} else if (queryFilter === 'completed') {
				return this.todos.filter((todo) => todo.done);
			} else if (queryFilter === 'approved') {
				return this.todos.filter((todo) => todo.approved);
			} else if (queryFilter === 'daily') {
				return this.todos.filter((todo) => todo.isDaily);
			} else if (queryFilter === 'personal') {
				return this.todos.filter((todo) => !todo.partner);
			} else {
				this.$router.replace('/todos2');
				return this.todos;
			}
		},
		hasTodos() {
			return this.filteredTodos && this.filteredTodos.length > 0;
		},
	},
};
</script>
