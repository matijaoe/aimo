<template>
	<div class="flex flex-wrap">
		<div class="w-full">
			<TabsWrapper :tabs="tabs" />
			<TodosWrapper :filter-option="filterOption" />
		</div>
	</div>
</template>

<script>
import TabsWrapper from 'todos/TabsWrapper';
import TodosWrapper from 'todos/TodosWrapper';
export default {
	components: { TabsWrapper, TodosWrapper },
	data() {
		return {
			filterOption: 'default',
			tabs: [
				{
					name: 'all',
					link: '/todos',
				},
			],
		};
	},
};
</script>
