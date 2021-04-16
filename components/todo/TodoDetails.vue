<template>
	<BaseContainer class="grid grid-cols-2 gap-4">
		<h1 class="text-2xl font-bold col-span-2">{{ todo.title }}</h1>
		<TodoInfoCard :todo="todo" />
		<TodoPartnerCard :partner="partner" />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import TodoPartnerCard from './TodoPartnerCard';
import TodoInfoCard from './TodoInfoCard';
export default {
	components: { TodoInfoCard, TodoPartnerCard, BaseContainer },
	props: {
		todo: {
			type: Object,
			required: true,
		},
		partner: {
			type: Object,
			required: true,
		},
	},
};
</script>
