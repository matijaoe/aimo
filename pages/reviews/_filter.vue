<template>
	<ReviewsWrapper :filter="filter" />
</template>

<script>
import ReviewsWrapper from 'reviews/ReviewsWrapper';
export default {
	components: { ReviewsWrapper },
	async asyncData({ params, redirect }) {
		const filter = await params.filter;
		if (!['completed', 'approved', 'inprogress'].includes(filter)) {
			redirect('/reviews');
		}
		return { filter };
	},
};
</script>
