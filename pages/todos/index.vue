<template>
	<div>
		<h1 class="text-5xl">Todos</h1>
		<TodoFilter @set-filter-key="setFilterKey"></TodoFilter>
		<TabsWrapper :filter-option="filterKey"></TabsWrapper>
	</div>
</template>

<script>
import TodoFilter from '../../components/todos/TodoFilter';
import TabsWrapper from '../../components/todos/TabsWrapper.vue';
export default {
	components: { TodoFilter, TabsWrapper },
	data() {
		return {
			filterKey: 'default',
		};
	},
	methods: {
		setFilterKey(key) {
			this.filterKey = key;
		},
	},
};
</script>
