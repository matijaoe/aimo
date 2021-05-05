<template>
	<div class="grid grid-cols-2 gap-4">
		<div class="flex items-center gap-2 col-span-2">
			<h1 class="text-2xl font-bold">{{ todo.name }}</h1>
		</div>
		<TodoInfoCard class="row-span-2" :todo="todo" />
		<TodoPartnerCard :partner="partner" />
		<TodoDescCard :desc="todo.desc" />
	</div>
</template>

<script>
import TodoPartnerCard from './TodoPartnerCard';
import TodoInfoCard from './TodoInfoCard';
import TodoDescCard from './TodoDescCard';

export default {
	components: { TodoDescCard, TodoInfoCard, TodoPartnerCard },
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
