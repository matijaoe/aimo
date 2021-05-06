import * as fb from '@/firebase';

export const state = () => ({
	reviews: [],
	reviewTodos: [],
});
export const getters = {
	currentUserTodoReviews(state) {
		return state.reviewTodos;
	},
	activeReviewPartners(state, getters, rootState, rootGetters) {
		const partners = [];
		const duplicateChecker = [];
		for (const todo of state.reviewTodos) {
			if (!duplicateChecker.includes(todo.owner)) {
				duplicateChecker.push(todo.owner);
				partners.push(rootGetters['users/getUserById'](todo.owner));
			}
		}
		return partners;
	},
	getReviewByTodoId: (state, getters) => (todoId) => {
		return getters.currentUserTodoReviews.find(
			(review) => review.id === todoId
		);
	},
};

export const mutations = {
	loadReviews(state, payload) {
		state.reviews = payload.userReviews;
		state.reviewTodos = payload.reviewTodos;
	},
};

export const actions = {
	async loadUserReviews({ commit, getters, rootGetters }) {
		try {
			const reviews = await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('reviews')
				.get();
			const userReviews = [];
			for (const doc of reviews.docs) {
				userReviews.push({
					...doc.data(),
				});
			}
			const reviewTodos = [];
			for (const review of userReviews) {
				try {
					const todoDoc = await fb.usersCollection
						.doc(review.partner)
						.collection('todos')
						.doc(review.todoId)
						.get();
					reviewTodos.push({
						...todoDoc.data(),
						owner: review.partner,
						reviewed: review.reviewed,
						id: review.todoId,
					});
				} catch (error) {
					// eslint-disable-next-line no-console
					console.log(error);
				}
			}
			const payload = {
				userReviews,
				reviewTodos,
			};
			commit('loadReviews', payload);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	},
};
