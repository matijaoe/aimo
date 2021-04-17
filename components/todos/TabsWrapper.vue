<template>
	<!-- todo style scrollbar -->
	<ul class="flex flex-items-center gap-2">
		<TodoTab
			v-for="tab in tabs"
			:key="tab.name"
			:label="tab.name"
			:link="tab.link"
		/>
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
