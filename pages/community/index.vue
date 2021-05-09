<template>
	<div>
		<PostsWrapper :todos="todos" />
	</div>
</template>

<script>
import PostsWrapper from '../../components/community/PostsWrapper';

export default {
	components: { PostsWrapper },
	async asyncData({ store }) {
		const todos = await store.dispatch('todos/getCommunityTodos');
		return { todos };
	},
};
</script>
