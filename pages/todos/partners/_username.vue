<template>
	<TodosWrapper filter-category="partners" :filter="username" />
</template>

<script>
import TodosWrapper from 'todos/TodosWrapper';

export default {
	components: { TodosWrapper },
	async asyncData({ params, redirect, store }) {
		const username = await params.username;
		if (!store.getters['todos/activePartnersUsername'].includes(username)) {
			redirect('/todos');
		}
		return { username };
	},
};
</script>
