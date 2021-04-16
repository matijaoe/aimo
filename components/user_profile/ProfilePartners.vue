<template>
	<BaseContainer fieldset label="Partners">
		<div v-if="partners.length" class="grid grid-cols-7 gap-2">
			<div v-for="partner in partners" :key="partner.username">
				<!-- todo 
							- veci popup sa linkom na profil ili na partnership
							- mozda extra info o partneru
						-->
				<nuxt-link
					v-tooltip.bottom="`@${partner.username}`"
					class="inline-block"
					:to="`/user/${partner.username}`"
				>
					<BaseAvatar :src="partner.photo" />
				</nuxt-link>
			</div>
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
		...mapGetters('users', ['users', 'getUserById']),
		...mapGetters('partners', ['partnerships', 'getPartnersById']),
		partners() {
			return this.getPartnersById(this.userId);
		},
	},
};
</script>
