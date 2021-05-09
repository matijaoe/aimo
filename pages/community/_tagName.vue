<template>
	<PostsWrapper :todos="todos" :category="category" />
</template>

<script>
import PostsWrapper from '@/components/community/PostsWrapper';

export default {
	components: { PostsWrapper },
	async asyncData({ params, store, redirect }) {
		const tagName = await params.tagName;
		const filterCategory = store.getters.getCategoryIdByName(tagName);
		if (!filterCategory) {
			redirect('/community');
		}
		const todos = await store.dispatch('todos/getCommunityTodos');
		const category = {
			id: filterCategory,
			name: tagName,
		};
		return { todos, category };
	},
};
</script>
