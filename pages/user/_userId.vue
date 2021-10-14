<template>
	<!-- Main grid with 3 cols -->
	<div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-4 h-full">
		<!-- Column 1 -->
		<div class="flex flex-col gap-2">
			<ProfileInfo :user="user" :is-logged-in="isLoggedInUser" />
			<ProfileCoins :user="user" />
		</div>

		<!-- Column 2 -->
		<div class="flex flex-col gap-2">
			<ProfileSocials
				class="order-4 lg:order-1"
				:socials="user.socials"
			/>
			<ProfilePartners
				class="order-3 lg:order-2"
				:user="user"
				:user-id="userId"
			/>
			<ProfileBio class="order-1 lg:order-3" :user="user" />
			<ProfileCategories
				class="order-2 lg:order-4"
				:categories="getUserCategories"
			/>
		</div>

		<!-- Column 3 -->
		<div class="flex flex-col gap-2 mb-20 lg:mb-0">
			<ProfileNotifications
				v-if="isLoggedInUser"
				:notifications="notifications"
				class="xl:block custom-height overflow-y-auto"
			/>
			<ProfileTodos
				v-else
				class="custom-height overflow-y-auto"
				:todos="todos"
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
		const user = store.getters['users/getUserById'](userId);
		const getUserCategories = await store.dispatch(
			'users/getUserCategories',
			{ username: userId, amount: 8 }
		);
		if (!user) {
			// todo - redirect to 404
			redirect('/home');
		}

		const todos = await store.dispatch(
			'todos/getUserTodosByUsername',
			userId
		);

		return { userId, getUserCategories, todos };
	},
	data() {
		return {
			userId: this.$route.params.userId,
		};
	},
	computed: {
		...mapGetters(['currentUserId']),
		...mapGetters('users', ['users', 'getUserById']),
		...mapGetters('notifications', ['notifications']),
		user() {
			return this.getUserById(this.userId);
		},
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
