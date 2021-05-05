<template>
	<div>
		<TodoDetails :todo="todo" :partner="partner" />
		<TodoMenu :todo="todo" />
		<TodoInteractionWrapper :interactions="interactions" />
	</div>
</template>

<script>
import TodoDetails from '@/components/todo/TodoDetails';
import TodoMenu from '@/components/todo/TodoMenu';
import TodoInteractionWrapper from '@/components/todo/TodoInteractionWrapper';
import { nanoid } from 'nanoid';

export default {
	components: { TodoInteractionWrapper, TodoMenu, TodoDetails },
	data() {
		return {
			todoId: null,
			interactions: [
				{
					id: nanoid(1000),
					type: 'review',
					date: new Date(2021, 3, 1, 21, 36),
					info: 'Partner reviewed you engagement!',
					score: '5', // opcionalno
				},
				{
					id: nanoid(1000),
					type: 'engagement',
					date: new Date(2021, 2, 6, 8, 32),
					info: 'You updated your engagement!',
					photo: 'opt', // opcionalno
				},
				{
					id: nanoid(1000),
					type: 'approved',
					date: new Date(2021, 2, 4, 14, 56),
					info: 'Your partner agreed to do this todo with you!',
				},
				{
					id: nanoid(1000),
					type: 'created',
					date: new Date(2021, 2, 1, 1, 3),
					info: 'You started this todo!',
				},
			],
		};
	},
	computed: {
		todo() {
			return this.$store.getters['todos/getCurrentUserTodoById'](
				this.todoId
			);
		},
		partner() {
			return this.$store.getters['users/getUserById'](this.todo.partner);
		},
	},
	created() {
		this.todoId = this.$route.params.todoId;
	},
};
</script>
