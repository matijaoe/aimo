<template>
	<TodosWrapper filter-option="partners" :filter-attr="username" />
</template>

<script>
import TodosWrapper from '../../../components/todos/TodosWrapper.vue';
export default {
	components: { TodosWrapper },
	// eslint-disable-next-line require-await
	async asyncData({ params }) {
		const username = params.username === 'personal' ? '' : params.username;
		return { username };
	},
};
</script>
