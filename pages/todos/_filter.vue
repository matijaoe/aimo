<template>
	<TodosWrapper :filter="filter" />
</template>

<script>
import TodosWrapper from 'todos/TodosWrapper';

export default {
	components: { TodosWrapper },
	async asyncData({ params, redirect }) {
		const filter = await params.filter;
		if (
			![
				'completed',
				'approved',
				'important',
				'daily',
				'personal',
			].includes(filter)
		) {
			redirect('/todos');
		}
		return { filter };
	},
};
</script>
