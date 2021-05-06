import * as fb from '@/firebase';

export const state = () => ({
	reviews: [],
});

export const mutations = {
	loadReviews(state, reviews) {
		state.reviews = reviews;
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
					username: doc.id,
				});
			}
			commit('loadReviews', userReviews);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	},
};
