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
					link: '/todos?filter=all',
				},
				{
					name: 'favorites',
					link: '/todos?filter=favorites',
				},
			],
		};
	},
	created() {
		if (this.$route.query.filter) {
			return;
		}
		this.$router.replace('/todos?filter=all');
	},
};
</script>
