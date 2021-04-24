<template>
	<TodosAndSearchContainer :filter="filter" />
</template>
<script>
import TodosAndSearchContainer from '../../components/todos/TodosAndSearchContainer';
export default {
	components: { TodosAndSearchContainer },
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
