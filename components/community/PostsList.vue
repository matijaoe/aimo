<template>
	<ul class="flex flex-col gap-4 overflow-y-auto pb-2 pr-2">
		<PostItem v-for="todo in todos" :key="todo.id" :todo="todo" />
	</ul>
</template>

<script>
import PostItem from './PostItem';

export default {
	components: { PostItem },
	props: {
		todos: {
			type: Array,
			required: true,
		},
	},
};
</script>
