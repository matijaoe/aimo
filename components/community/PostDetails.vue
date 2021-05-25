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
					<BaseButton
						id="detailsBtn"
						mode="cta"
						class="relative left-[15px]"
						@click="showOrHideDetails"
					>
						{{ showDetailsText }}
					</BaseButton>
				</div>
			</div>
			<div
				v-if="todo.desc && showDetails"
				class="border-2 border-dashed border-gray-200 bg-gray-50 rounded-lg p-4 text-sm"
			>
				<img
					v-if="this.todo.photoUrl"
					id="todoPhoto"
					:src="this.todo.photoUrl"
					alt="Todo image"
					class="rounded-lg max-h-[300px] py-2 center"
				/>
				<p>{{ todo.desc }}</p>
			</div>

			<TagLabels
				v-if="todo.categories.length > 0"
				:categories="todo.categories"
			/>
		</div>
	</div>
</template>

<script>
import TagLabels from '@/components/todo/TagLabels';
import BaseTimestamp from 'UI/BaseTimestamp';
import dayjs from 'dayjs';
import BaseButton from '../UI/BaseButton.vue';

export default {
	components: { TagLabels, BaseTimestamp, BaseButton },
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			showDetails: false,
			showDetailsText: 'Show Details',
		};
	},
	computed: {
		createdDate() {
			const dt = dayjs(this.todo.timestamp);
			const date = dt.format(`MMMM DD`);
			return `${date}`;
		},
	},
	methods: {
		showOrHideDetails() {
			this.showDetails = !this.showDetails;
			if (this.showDetails) {
				this.showDetailsText = 'Hide Details';
			} else {
				this.showDetailsText = 'Show Details';
			}
		},
	},
};
</script>

<style scoped>
#todoPhoto {
	margin: 0 auto;
}

#detailsBtn {
	transform: scale(0.8, 0.8);
}
</style>
