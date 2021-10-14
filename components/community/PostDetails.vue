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
				v-if="todo.photoUrl"
				id="todoPhoto"
				:src="todo.photoUrl"
				alt="Todo image"
				class="
					rounded-lg
					max-w-[110px]
					center
					cursor-pointer
					hover:opacity-75
				"
				@click="active = !active"
			/>
			<div class="center">
				<vs-dialog v-model="active">
					<img :src="todo.photoUrl" class="rounded-lg mt-[18px]" />
				</vs-dialog>
			</div>

			<div
				v-if="todo.desc"
				class="
					border-2 border-dashed border-gray-200
					bg-gray-50
					rounded-lg
					p-4
					text-sm
				"
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
import BaseTimestamp from 'UI/BaseTimestamp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TagLabels from '@/components/todo/TagLabels';

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
			dayjs.extend(relativeTime);
			const dt = dayjs.unix(this.todo.created_at.seconds);
			return dayjs().to(dt);
		},
	},
};
</script>
