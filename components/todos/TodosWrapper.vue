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
			:status="todo.status"
			:favorite="todo.favorite"
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
				return this.searchByDefault();
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
	methods: {
		searchByDefault() {
			const queryFilter = this.$route.query.filter;
			if (queryFilter === 'all')
				return this.$store.getters['todos/allTodos'];
			else if (queryFilter === 'favorites')
				return this.$store.getters['todos/getFavoriteTodos'];
			else if (
				[
					'reviewed',
					'engagement',
					'created',
					'finished',
					'approved',
				].includes(queryFilter)
			) {
				return this.$store.getters['todos/getTodosByStatus'](
					queryFilter === 'engagement'
						? 'engagement submitted'
						: queryFilter
				);
			}
			return this.$store.getters['todos/allTodos'];
		},
	},
};
</script>
