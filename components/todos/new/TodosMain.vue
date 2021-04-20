<template>
	<div class="text-xl font-light">
		<ul>
			<TodoItem
				v-for="todo in todos"
				:key="todo.id"
				:tags="todo.categories"
				:partner-id="todo.partner"
				:completed="todo.done"
			>
				{{ todo.name }}
			</TodoItem>
		</ul>
	</div>
</template>

<script>
import TodoItem from 'todos/new/TodoItem.vue';

export default {
	components: { TodoItem },
	props: {
		todos: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
