<template>
	<TodosWrapper filter-option="partners" :filter-attr="username" />
</template>

<script>
import TodosWrapper from 'todos/TodosWrapper.vue';
export default {
	components: { TodosWrapper },
	async asyncData({ params }) {
		const username =
			(await params.username) === 'personal' ? '' : params.username;
		return { username };
	},
};
</script>
