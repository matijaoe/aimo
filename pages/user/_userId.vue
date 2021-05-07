<template>
	<!-- Main grid with 3 cols -->
	<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
		<!-- Column 1 -->
		<div class="space-y-2">
			<ProfileInfo :user="user" :is-logged-in="isLoggedInUser" />
			<ProfileCoins :user="user" />
		</div>

		<!-- Column 2 -->
		<div class="space-y-2">
			<ProfileSocials :socials="user.socials" />
			<ProfilePartners :user="user" :user-id="userId" />
			<ProfileBio :user="user" />
			<ProfileCategories :categories="getUserCategories(userId, 8)" />
		</div>

		<!-- Column 3 -->
		<div class="h-full">
			<ProfileNotifications
				v-if="isLoggedInUser"
				:notifications="user.notifications"
			/>
		</div>
	</div>
</template>

<script>
import ProfileInfo from 'profile/ProfileInfo.vue';
import ProfileCoins from 'profile/ProfileCoins.vue';
import ProfileSocials from 'profile/ProfileSocials.vue';
import ProfilePartners from 'profile/ProfilePartners.vue';
import ProfileBio from 'profile/ProfileBio.vue';
import ProfileNotifications from 'profile/ProfileNotifications.vue';
import ProfileCategories from 'profile/ProfileCategories.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		ProfileInfo,
		ProfileCoins,
		ProfileSocials,
		ProfilePartners,
		ProfileBio,
		ProfileNotifications,
		ProfileCategories,
	},
	async asyncData({ params, store, redirect }) {
		const userId = await params.userId;
		const user = await store.dispatch('users/loadUserById', userId);
		if (user.error) {
			// todo - redirect to 404
			redirect('/home');
		}
		return { user };
	},
	data() {
		return {
			userId: this.$route.params.userId,
		};
	},
	computed: {
		...mapGetters('users', ['users', 'getUserById', 'getUserCategories']),
		...mapGetters('partners', ['partnerships']),
		/* user() {
			const user = this.getUserById(this.userId);
			return user;
		}, */
		isLoggedInUser() {
			const currentLoggedInUser = this.$store.getters.currentUserId;
			return currentLoggedInUser === this.userId;
		},
	},
};
</script>
