<template>
	<div class="mt-4 flex flex-col gap-2">
		<BaseContainer v-if="!hasTodos" class="flex justify-center py-4">
			<p>You dot't have todos at this moment.</p>
		</BaseContainer>
		<TodoItem
			v-for="todo in filteredTodos"
			:key="todo.id"
			:todo-id="todo.id"
			:title="todo.title"
			:partner="todo.partner"
			:desc="todo.desc"
		/>
	</div>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import TodoItem from './TodoItem.vue';

export default {
	components: { BaseContainer, TodoItem },
	props: {
		filterOption: {
			type: String,
			required: true,
		},
		filterAttr: {
			type: String,
			required: false,
			default: 'all',
		},
	},
	computed: {
		filteredTodos() {
			if (this.filterOption === 'default') {
				if (this.$route.query.filter === 'all')
					return this.$store.getters['todos/allTodos'];
				else if (this.$route.query.filter === 'favorites')
					return this.$store.getters['todos/getFavoriteTodos'];
				return this.$store.getters['todos/allTodos'];
			} else if (this.filterOption === 'partners') {
				return this.$store.getters['todos/getTodosByPartner'](
					this.filterAttr
				);
			}
			return this.$store.getters['todos/allTodos'];
		},
		hasTodos() {
			return this.filteredTodos && this.filteredTodos.length > 0;
		},
	},
};
</script>
