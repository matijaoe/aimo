<template>
	<BaseContainer fieldset label="Partners">
		<div v-if="partners.length" class="grid gap-2 my-grid">
			<BaseAvatar
				v-for="partner in partners"
				:key="partner.username"
				v-tooltip.bottom="partner.username"
				:src="partner.photo"
				link
				:to="{
					path: `/user/${partner.username}`,
				}"
			/>
		</div>
		<div v-else>{{ user.fname }} has no partners ...</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';

import { mapGetters } from 'vuex';

export default {
	components: { BaseContainer, BaseAvatar },
	props: ['user', 'userId'],
	computed: {
		...mapGetters('partners', ['getPartnersById']),
		partners() {
			return this.getPartnersById(this.userId);
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
