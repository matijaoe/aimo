<template>
	<!-- Main grid with 3 cols -->
	<div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full mb-10">
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
			<ProfileCategories :categories="getUserCategories" />
		</div>

		<!-- Column 3 -->
		<div class="space-y-2">
			<ProfileNotifications
				v-if="isLoggedInUser"
				:notifications="user.notifications"
				class="hidden xl:block custom-height"
			/>
			<ProfileTodos v-else class="custom-height" :todos="todos" />
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
import ProfileTodos from 'profile/ProfileTodos.vue';

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
		ProfileTodos,
	},
	async asyncData({ params, store, redirect }) {
		const userId = await params.userId;
		const user = await store.dispatch('users/loadUserById', userId);
		const getUserCategories = await store.dispatch(
			'users/getUserCategories',
			{ username: userId, amount: 8 }
		);
		if (user.error) {
			// todo - redirect to 404
			redirect('/home');
		}

		const todos = await store.dispatch(
			'todos/getUserTodosByUsername',
			userId
		);

		return { user, getUserCategories, todos };
	},
	data() {
		return {
			userId: this.$route.params.userId,
		};
	},
	computed: {
		...mapGetters(['currentUserId']),
		...mapGetters('users', ['users', 'getUserById']),
		isLoggedInUser() {
			return this.currentUserId === this.userId;
		},
	},
};
</script>

<style scoped>
.custom-height {
	max-height: calc(100vh - 9rem);
}
</style>
