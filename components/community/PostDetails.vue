<template>
	<div class="space-y-4">
		<div class="flex flex-col gap-2 justify-center ml-2 col-span-1">
			<div class="flex items-center justify-between">
				<h3 class="text-lg">{{ todo.name }}</h3>
				<div class="flex flex-col items-end justify-between">
					<BaseTimestamp
						:date="createdDate"
						class="relative bottom-[6px]"
					/>
				</div>
			</div>

			<img
				v-if="this.todo.photoUrl"
				id="todoPhoto"
				:src="this.todo.photoUrl"
				alt="Todo image"
				class="rounded-lg max-w-[110px] center cursor-pointer hover:opacity-75"
				@click="active = !active"
			/>
			<div class="center">
				<vs-dialog v-model="active">
					<img
						:src="this.todo.photoUrl"
						class="rounded-lg mt-[18px]"
					/>
				</vs-dialog>
			</div>

			<div
				v-if="todo.desc"
				class="border-2 border-dashed border-gray-200 bg-gray-50 rounded-lg p-4 text-sm"
			>
				<p>{{ todo.desc }}</p>
			</div>
		</div>

		<TagLabels
			v-if="todo.categories.length > 0"
			:categories="todo.categories"
		/>
	</div>
</template>

<script>
import TagLabels from '@/components/todo/TagLabels';
import BaseTimestamp from 'UI/BaseTimestamp';
import dayjs from 'dayjs';

export default {
	components: { TagLabels, BaseTimestamp },
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			active: false,
		};
	},
	computed: {
		createdDate() {
			const dt = dayjs(this.todo.timestamp);
			const date = dt.format(`MMMM DD`);
			return `${date}`;
		},
	},
};
</script>

<style scoped>
/* #todoPhoto {
	margin: 0 auto;
} */
</style>
