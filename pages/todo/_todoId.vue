<template>
	<div>
		<TodoDetails :todo="todo" :partner="partner" />
		<TodoMenu :todo="todo" />
		<TodoInteractionWrapper :interactions="todo.interactions" />
	</div>
</template>

<script>
import TodoDetails from '@/components/todo/TodoDetails';
import TodoMenu from '@/components/todo/TodoMenu';
import TodoInteractionWrapper from '@/components/todo/TodoInteractionWrapper';

export default {
	components: { TodoInteractionWrapper, TodoMenu, TodoDetails },
	data() {
		return {
			todo: {},
			partner: {},
		};
	},
	created() {
		const todoId = this.$route.params.todoId;
		this.todo = this.$store.getters['todos/getTodoById'](todoId);
		this.partner = this.$store.getters['users/getUserById'](
			this.todo.partner
		);
	},
};
</script>
