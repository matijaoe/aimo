<template>
	<TodosWrapper filter-category="tags" :filter="tagName" />
</template>

<script>
import TodosWrapper from 'todos/TodosWrapper';

export default {
	components: { TodosWrapper },
	async asyncData({ params, redirect, store }) {
		const tagName = await params.tagName;
		if (
			!store.getters['todos/activeTags']
				.map((tag) => tag.name)
				.includes(tagName)
		) {
			redirect('/todos');
		}
		return { tagName };
	},
};
</script>
