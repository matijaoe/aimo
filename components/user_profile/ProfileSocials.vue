<template>
	<BaseContainer fieldset label="Socials">
		<div class="grid gap-2 my-grid">
			<BaseBrandIcon
				v-for="social in user.socials"
				:key="social"
				:brand="social"
				href="#"
			/>
		</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseBrandIcon from 'UI/BaseBrandIcon.vue';

export default {
	components: { BaseContainer, BaseBrandIcon },
	props: ['user'],
};
</script>

<style scoped>
.my-grid {
	grid-template-columns: repeat(auto-fill, 40px);
	justify-content: space-between;
}
</style>
