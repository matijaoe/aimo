<template>
	<ul class="grid grid-cols-4 gap-2 mt-8">
		<PostItem
			v-for="(todo, index) in todos"
			:key="todo.id"
			:todo="todo"
			:index="index"
		/>
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
