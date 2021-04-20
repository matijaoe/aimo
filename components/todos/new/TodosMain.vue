<template>
	<div class="text-xl font-light">
		<ul>
			<!-- <TodoItem
			
				:tags="[
					{ name: 'social', color: 'emerald' },
					{ name: 'hygiene', color: 'pink' },
				]"
			>
				osisati se
			</TodoItem>
			<TodoItem :completed="true"> citati knjigu </TodoItem>
			<TodoItem :completed="true"> voziti bicikl </TodoItem>
			<TodoItem :completed="false">
				voziti traktor
			</TodoItem>
			<TodoItem :completed="true">bench</TodoItem>
			<TodoItem>react</TodoItem>
			<TodoItem :completed="true">nuxt</TodoItem>
			<TodoItem>naucit baze</TodoItem>
			<TodoItem :completed="true">
				pljuvat superligu
			</TodoItem>
			<TodoItem>obavit tjelesni</TodoItem>
			<TodoItem>napravit mreze</TodoItem>
			<TodoItem>kodirat aimo</TodoItem>
			<TodoItem>istrazit faxove</TodoItem> -->
			<TodoItem
				v-for="todo in user.todos"
				:key="todo.id"
				:tags="todo.categories"
				:partner-id="todo.partner"
			>
				{{ todo.name }}
			</TodoItem>
		</ul>
	</div>
</template>

<script>
import TodoItem from 'todos/new/TodoItem.vue';

export default {
	components: { TodoItem },
	props: {
		user: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
