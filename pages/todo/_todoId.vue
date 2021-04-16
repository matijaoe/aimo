<template>
	<div>
		<h1>Lol {{ todo.id }}</h1>
		<TodoDetails :todo="todo" :partner="partner" />
	</div>
</template>

<script>
import TodoDetails from '../../components/todo/TodoDetails';
export default {
	components: { TodoDetails },
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
