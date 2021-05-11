<template>
	<BaseContainer class="flex custom-height" no-padding>
		<ReviewsSidebar
			class="w-[50px] md:w-[200px] overflow-y-auto flex-shrink-0 pt-2.5"
		/>
		<transition>
			<Nuxt />
		</transition>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import ReviewsSidebar from 'reviews/ReviewsSidebar';
export default {
	components: { ReviewsSidebar, BaseContainer },
};
</script>

<style scoped>
.custom-height {
	height: calc(100vh - 9rem);
}
</style>
