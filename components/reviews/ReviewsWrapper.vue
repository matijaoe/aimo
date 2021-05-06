<template>
	<div class="flex-1 bg-gray-100 flex flex-col">
		<ReviewsSearchbar @search="searchTodos" @sort="sortTodos" />
		<ReviewsList
			class="flex-1 overflow-y-auto"
			:filter-category="filterCategory"
			:filter="filter"
			:todos="allTodos"
		/>
		<transition name="fade">
			<ReviewModal v-if="modalShown" :review-id="reviewId" />
		</transition>
	</div>
</template>

<script>
import { orderBy as _orderBy } from 'lodash';

import { mapGetters } from 'vuex';
import ReviewsSearchbar from './ReviewsSearchbar';
import ReviewsList from './ReviewsList';
import ReviewModal from './ReviewModal';

export default {
	components: { ReviewModal, ReviewsList, ReviewsSearchbar },
	provide() {
		return {
			openReview: this.openReview,
			closeReview: this.closeReview,
		};
	},
	props: {
		filter: {
			type: String,
			required: false,
			default: 'all',
		},
		filterCategory: {
			type: String,
			required: false,
			default: 'default',
		},
	},
	data() {
		return {
			todos: [],
			modalShown: false,
			reviewId: null,
			term: '',
			sortArg: '',
		};
	},
	computed: {
		...mapGetters('reviews', ['currentUserTodoReviews']),
		allTodos() {
			const allTodos = this.currentUserTodoReviews.filter((todo) => {
				return todo.name
					.toLowerCase()
					.includes(this.term.toLowerCase());
			});
			if (this.sortArg === 'asc' || this.sortArg === 'desc') {
				return _orderBy(
					allTodos,
					[(todo) => todo.name.toLowerCase()],
					[this.sortArg]
				);
			}
			return allTodos;
		},
	},
	methods: {
		openReview(reviewId) {
			this.reviewId = reviewId;
			this.modalShown = true;
		},
		closeReview() {
			this.modalShown = false;
			this.reviewId = null;
		},
		sortTodos(arg) {
			this.sortArg = arg;
		},
		searchTodos(term) {
			this.term = term;
		},
	},
};
</script>
