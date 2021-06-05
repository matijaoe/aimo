<template>
	<PostsWrapper :todos="todos" :category-name="tagName" />
</template>

<script>
import PostsWrapper from '@/components/community/PostsWrapper';

export default {
	components: { PostsWrapper },
	async asyncData({ params, store, redirect }) {
		const tagName = await params.tagName;
		if (
			!store.getters.categories.map((cat) => cat.name).includes(tagName)
		) {
			redirect('/community');
		}
		const todos = await store.dispatch('todos/getCommunityTodos', tagName);
		return { todos, tagName };
	},
};
</script>
