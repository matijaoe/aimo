<template>
	<div class="text-xl font-light">
		<ul>
			<li>
				<TodoItem color="red">osisati se</TodoItem>
			</li>
			<li>
				<TodoItem color="amber">citati knjigu</TodoItem>
			</li>
			<li>
				<TodoItem color="green">voziti bicikl</TodoItem>
			</li>
			<li>
				<TodoItem color="blue">voziti traktor</TodoItem>
			</li>
			<li>
				<TodoItem color="orange">bench</TodoItem>
			</li>
			<li>
				<TodoItem color="purple">react</TodoItem>
			</li>
			<li>
				<TodoItem color="yellow">otic kod cure</TodoItem>
			</li>
		</ul>
	</div>
</template>

<script>
import TodoItem from 'todos/new/TodoItem.vue';
export default {
	components: { TodoItem },
};
</script>
