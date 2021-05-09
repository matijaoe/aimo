<template>
	<div class="grid gap-6">
		<TodoAttributes
			:is-important="todo.important"
			:is-daily="todo.daily"
			:is-completed="todo.done"
			:is-approved="todo.approved"
			:is-personal="!todo.partner"
			:partner="getUserById(todo.partner)"
		/>

		<TodoHeader :todo="todo" />

		<TagLabels :categories="todo.categories" />

		<div class="grid grid-cols-2 gap-4">
			<TodoDescCard :desc="todo.desc" />
			<TodoPartnerCard :partner="partner" />
		</div>
	</div>
</template>

<script>
import TodoAttributes from 'todos/TodoAttributes';
import { mapGetters } from 'vuex';

import TodoPartnerCard from './TodoPartnerCard';
import TodoDescCard from './TodoDescCard';
import TagLabels from './TagLabels';
import TodoHeader from './TodoHeader';

export default {
	components: {
		TodoDescCard,
		TagLabels,
		TodoHeader,
		TodoPartnerCard,
		TodoAttributes,
	},
	props: {
		todo: {
			type: Object,
			required: true,
		},
		partner: {
			type: Object,
			required: false,
		},
	},
	computed: {
		...mapGetters('users', ['getUserById']),
	},
};
</script>
