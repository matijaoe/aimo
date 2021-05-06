export default async ({ store }) => {
	await store.dispatch('reviews/loadUserReviews');
};
