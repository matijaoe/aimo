<template>
	<div class="grid grid-cols-2 gap-4">
		<h1 class="text-2xl font-bold col-span-2">Todo: {{ todo.title }}</h1>
		<TodoInfoCard :todo="todo" />
		<TodoPartnerCard :partner="partner" />
	</div>
</template>

<script>
import TodoPartnerCard from './TodoPartnerCard';
import TodoInfoCard from './TodoInfoCard';

export default {
	components: { TodoInfoCard, TodoPartnerCard },
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
};
</script>
