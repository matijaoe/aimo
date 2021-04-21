<template>
	<BaseContainer fieldset label="Socials">
		<div class="grid gap-2 my-grid">
			<BaseBrandIcon
				v-for="social in socials"
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
	computed: {
		socials() {
			return this.user.socials.map((s) => s.id);
		},
	},
};
</script>

<style scoped>
.my-grid {
	grid-template-columns: repeat(auto-fill, 40px);
	justify-content: space-between;
}
</style>
