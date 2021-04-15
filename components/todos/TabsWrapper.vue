<template>
	<ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
		<TodoTab
			v-for="tab in tabs"
			:key="tab.name"
			:label="tab.name"
			:link="tab.link"
		></TodoTab>
	</ul>
</template>

<script>
import TodoTab from './TodoTab';
export default {
	components: { TodoTab },
	props: {
		tabs: {
			type: Array,
			required: true,
		},
	},
};
</script>
