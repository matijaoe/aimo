<template>
	<div class="flex justify-between items-end gap-2">
		<div class="flex items-center gap-8">
			<h2 class="text-3xl font-bold ml-1">{{ todo.name }}</h2>
		</div>
		<p class="text-xs text-gray-300 flex items-center gap-1 flex-shrink-0">
			<IconClock />
			{{ createdDate }}
		</p>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import IconClock from 'icons/IconClock';

export default {
	components: {
		IconClock,
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
