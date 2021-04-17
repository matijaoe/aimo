<template>
	<div>
		<h1 class="text-5xl">Todos</h1>
		<TodoFilter />
		<Nuxt />
	</div>
</template>

<script>
import TodoFilter from '@/components/todos/TodoFilter';
export default {
	components: { TodoFilter },
	data() {
		return {
			filterKey: 'default',
		};
	},
};
</script>
