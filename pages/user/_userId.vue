<template>
	<div class="flex gap-2 items-center">
		<h1>
			Welcome back
			<span
				class="p-2 rounded-md font-bold text-xl bg-red-200 text-red-500 mx-2"
			>
				{{ userInfo.fname }}
			</span>
		</h1>
		<img :src="userInfo.image" alt="" class="w-16 h-16 rounded-full" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			userId: this.$route.params.userId,
		};
	},
	computed: {
		...mapGetters('users', ['users']),
		userInfo() {
			if (!this.userId) {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.$router.push({
					path: '/user/404',
				});
			}

			// todo reusable getUserById -> mixin OR hook with compositionAPI
			const user = this.users.find(
				(user) => user.username === this.userId
			);

			if (!user) {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.$router.push({
					path: '/user/404',
				});
			}

			return user;
		},
	},
};
</script>
