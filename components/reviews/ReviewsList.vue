<template>
	<div class="text-xl font-light">
		<ul v-if="hasTodos">
			<ReviewItem
				v-for="todo in filteredTodos"
				:key="todo.id"
				:review="todo"
			>
				{{ todo.name }}
			</ReviewItem>
		</ul>
		<div
			v-else
			class="
				w-full
				h-full
				flex flex-col
				items-center
				justify-center
				gap-12
			"
		>
			<p class="font-semibold text-center text-2xl xl:text-5xl p-2">
				No todos for review 😩
			</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ReviewItem from './ReviewItem';

export default {
	components: { ReviewItem },
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
	emits: ['edit'],
	computed: {
		...mapGetters('todos', [
			'currentUserTodos',
			'todosByPartner',
			'todosByTag',
		]),
		filteredTodos() {
			if (this.filterCategory === 'default') {
				return this.defaultCatTodos;
			} else if (this.filterCategory === 'partners') {
				const partnerId = this.filter;
				return this.todos.filter((todo) => todo.owner === partnerId);
			}
			return [];
		},
		defaultCatTodos() {
			const option = this.filter;
			if (option === 'all') return this.todos;
			else if (option === 'approved')
				return this.todos.filter((todo) => todo.approved);
			else if (option === 'completed')
				return this.todos.filter((todo) => todo.done && !todo.approved);
			else if (option === 'inprogress')
				return this.todos.filter(
					(todo) => !todo.done && !todo.approved
				);
			return this.todos;
		},
		hasTodos() {
			return this.filteredTodos && this.filteredTodos.length > 0;
		},
	},
};
</script>
