<template>
	<TodosWrapper filter-category="tags" :filter="tagId" />
</template>

<script>
import TodosWrapper from 'todos/TodosWrapper';

export default {
	components: { TodosWrapper },
	async asyncData({ query, redirect, store }) {
		const tagId = await query.tagId;
		if (
			!store.getters['todos/activeTags']
				.map((tag) => tag.id)
				.includes(tagId)
		) {
			redirect('/todos');
		}
		return { tagId };
	},
};
</script>
