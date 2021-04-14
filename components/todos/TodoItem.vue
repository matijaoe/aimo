<template>
	<BaseContainer class="my-2">
		<header class="flex justify-between">
			<h2 class="text-lg font-bold">
				{{ title }}
				<span v-if="hasPartner"
					>/w
					<NuxtLink
						:to="`user/${partner}`"
						class="text-amber-300 hover:text-amber-400"
					>
						{{ partnerFullName }}</NuxtLink
					>
				</span>
			</h2>
			<!-- <BaseAvatar v-if="hasPartner" :src="partnerPictureUrl"></BaseAvatar> -->
			<BaseAvatar v-if="hasPartner"></BaseAvatar>
		</header>
		<section>
			<p>{{ desc }}</p>
		</section>
	</BaseContainer>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseContainer from '../UI/BaseContainer';
export default {
	components: { BaseContainer, BaseAvatar },
	props: {
		title: {
			type: String,
			required: true,
		},
		partner: {
			type: String,
			required: false,
			default: 'personal',
		},
		desc: {
			type: String,
			required: false,
			default: 'No description.',
		},
	},
	data() {
		return {
			partnerPictureUrl: null,
			partnerFullName: null,
		};
	},
	computed: {
		hasPartner() {
			return this.partner !== 'personal' && this.partner !== '';
		},
	},
	created() {
		if (this.hasPartner) {
			const { photo, fname, lname } = this.$store.getters[
				'users/users'
			].find((user) => user.username === this.partner);
			console.log('PHOTOOOO 🍕🍕🍕🍕');
			console.log(photo);
			this.partnerPictureUrl = photo;
			this.partnerFullName = `${fname} ${lname}`;
		}
	},
};
</script>
