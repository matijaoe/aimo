<template>
	<BaseContainer fieldset label="Socials">
		<div v-if="socialsData.length > 0" class="grid gap-2 my-grid">
			<BaseBrandIcon
				v-for="social in socialsData"
				:key="social.id"
				:brand="social.id"
				:href="social.url"
			/>
		</div>
		<BaseTag v-else>No socials found</BaseTag>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseBrandIcon from 'UI/BaseBrandIcon.vue';
import BaseTag from 'UI/BaseTag.vue';

import { mapGetters } from 'vuex';

export default {
	components: { BaseContainer, BaseBrandIcon, BaseTag },
	props: ['socials'],
	computed: {
		...mapGetters(['getSocialById']),
		socialsData() {
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
