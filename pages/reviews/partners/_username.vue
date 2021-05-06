<template>
	<ReviewsWrapper filter-category="partners" :filter="username" />
</template>

<script>
import ReviewsWrapper from 'reviews/ReviewsWrapper';

export default {
	components: { ReviewsWrapper },
	async asyncData({ params, redirect, store }) {
		const username = await params.username;
		const activePartnersUsername = store.getters[
			'reviews/activeReviewPartners'
		].map((todo) => todo.owner);
		if (activePartnersUsername.includes(username)) {
			redirect('/reviews');
		}
		return { username };
	},
};
</script>
