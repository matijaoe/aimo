<template>
	<div
		class="absolute top-0 left-0 bg-black bg-opacity-40 w-screen h-screen"
		@click="closeReview"
	>
		<div class="relative w-full h-screen">
			<article
				class="absolute top-0 right-0 h-screen w-full w-[480px] bg-white border-l-2 border-gray-200 py-10 px-6 overflow-y-auto space-y-2 flex flex-col"
				@click.stop=""
			>
				<div class="flex justify-end items-center pb-2">
					<TodoAttributes
						:is-important="review.important"
						:is-daily="review.daily"
						:is-completed="review.done"
						:is-approved="review.approved"
						:partner="partner"
					/>
				</div>

				<div class="space-y-4">
					<div class="flex justify-between items-end gap-2">
						<h2 class="text-3xl font-bold ml-1">
							{{ review.name }}
						</h2>
						<p
							class="text-xs text-gray-300 flex items-center gap-1 flex-shrink-0"
						>
							<IconClock />
							{{ createdAt }}
						</p>
					</div>
					<div
						v-if="review.desc"
						class="bg-gray-50 rounded-lg p-4 text-sm"
					>
						<p>{{ review.desc }}</p>
					</div>
				</div>
				<div
					v-if="review.done && !review.approved"
					class="flex-col gap-y-5"
				>
					<div
						class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
					>
						<p>Proof</p>
					</div>
					<div
						class="flex-col flex justify-center px-6 pt-5 pb-6 rounded-md"
					>
						<h3>Write your review:</h3>
						<textarea
							class="mt-1 flex px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md focus:outline-none"
						></textarea>
					</div>
					<BaseButton mode="cta"> Send Review </BaseButton>
				</div>
				<div v-else class="mt-1 flex justify-center px-6 pt-5 pb-6">
					<h3 class="text-lg">
						{{
							review.approved
								? 'Your job here is done!😀'
								: 'Not finished yet 🙄'
						}}
					</h3>
				</div>
			</article>
		</div>
	</div>
</template>

<script>
import IconClock from 'icons/IconClock';

import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import TodoAttributes from 'todos/TodoAttributes';
import BaseButton from '../UI/BaseButton';

export default {
	components: {
		BaseButton,
		TodoAttributes,
		IconClock,
	},
	inject: ['closeReview'],
	props: {
		reviewId: {
			type: String,
			required: true,
		},
	},
	computed: {
		...mapGetters('users', ['getUserById']),
		...mapGetters('reviews', ['getReviewByTodoId']),
		review() {
			return this.getReviewByTodoId(this.reviewId);
		},
		partner() {
			return this.getUserById(this.review.owner);
		},
		createdAt() {
			const dt = dayjs(this.review.timestamp);
			const date = dt.format(`MMMM DD`);
			const time = dt.format(`HH:mm`);
			return `${date} at ${time}`;
		},
	},
};
</script>
