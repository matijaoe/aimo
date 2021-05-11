<template>
	<div class="flex justify-between items-end gap-2">
		<div class="flex items-center gap-8">
			<h2 class="text-3xl font-bold ml-1">{{ todo.name }}</h2>
		</div>
		<BaseTimestamp :date="createdDate" />
	</div>
</template>

<script>
import dayjs from 'dayjs';
import BaseTimestamp from 'UI/BaseTimestamp';

export default {
	components: {
		BaseTimestamp,
	},
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	computed: {
		createdDate() {
			const dt = dayjs(this.todo.timestamp);
			const date = dt.format(`MMMM DD`);
			const time = dt.format(`HH:mm`);
			return `${date} at ${time}`;
		},
	},
};
</script>
