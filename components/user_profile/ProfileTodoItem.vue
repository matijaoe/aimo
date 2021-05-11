<template>
	<div class="space-y-2">
		<div class="flex items-center gap-2 justify-between">
			<p>{{ todo.name }}</p>
			<TodoAttributes
				:is-important="todo.important"
				:is-daily="todo.daily"
				:is-completed="todo.done"
				:is-approved="todo.approved"
				:is-personal="!todo.partner"
				:partner="getUserById(todo.partner)"
				small
			/>
		</div>
		<p v-if="todo.desc" class="bg-gray-50 rounded-lg p-2 text-xs">
			{{ todo.desc }}
		</p>
	</div>
</template>

<script>
import TodoAttributes from 'todos/TodoAttributes.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		TodoAttributes,
	},
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	computed: {
		...mapGetters('users', ['getUserById']),
	},
};
</script>
