<template>
	<TodosAndSearchContainer filter-category="partners" :filter="username" />
</template>
<script>
import TodosAndSearchContainer from '../../../components/todos/TodosAndSearchContainer';
export default {
	components: { TodosAndSearchContainer },
	async asyncData({ params, redirect, store }) {
		const username = await params.username;
		if (!store.getters['todos/activePartnersUsername'].includes(username)) {
			redirect('/todos');
		}
		return { username };
	},
};
</script>
