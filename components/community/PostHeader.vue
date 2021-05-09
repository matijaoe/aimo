<template>
	<div class="flex items-center justify-between gap-2 mb-4">
		<PostOwner :user="todo.owner" />
		<TodoAttributes
			:is-personal="!todo.partner"
			:is-approved="todo.approved"
			:is-completed="todo.done"
			:is-daily="todo.daily"
			:is-important="todo.important"
			:partner="todo.partner ? todo.partner : {}"
		/>
	</div>
</template>

<script>
import TodoAttributes from '../todos/TodoAttributes';
import PostOwner from './PostOwner';
export default {
	components: { TodoAttributes, PostOwner },
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
};
</script>
