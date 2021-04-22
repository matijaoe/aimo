<template>
	<BaseContainer fieldset label="Socials">
		<div class="grid gap-2 my-grid">
			<BaseBrandIcon
				v-for="social in socialsData"
				:key="social.id"
				:brand="social.id"
				:href="social.url"
			/>
		</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseBrandIcon from 'UI/BaseBrandIcon.vue';

import { mapGetters } from 'vuex';

export default {
	components: { BaseContainer, BaseBrandIcon },
	props: ['socials'],
	computed: {
		...mapGetters(['getSocialById']),
		socialsData() {
			// todo
			// console.log(this.socials);
			// const socials = [...this.socials];
			// socials.forEach((soc) => {
			// 	socials.name = this.getSocialById(soc.id);
			// });
			// console.log(socials);
			// return socials;
			return this.socials;
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
