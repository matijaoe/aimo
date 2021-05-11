<template>
	<header class="flex gap-8">
		<div class="rounded-lg">
			<HeaderSearchbar class="flex items-center sm:flex-1" />

			<HeaderSearchDropdown :results="results"></HeaderSearchDropdown>
		</div>

		<div class="flex justify-end flex-1">
			<div class="flex items-center space-x-4 sm:space-x-8">
				<HeaderNotificationDropdown
					:notifications="currentUser.notifications"
				/>
				<HeaderProfileDropdown :user="currentUser" />
			</div>
		</div>
	</header>
</template>

<script>
import HeaderSearchbar from 'layout/HeaderSearchbar.vue';
import HeaderNotificationDropdown from 'layout/HeaderNotificationDropdown.vue';
import HeaderProfileDropdown from 'layout/HeaderProfileDropdown.vue';
import HeaderSearchDropdown from 'layout/HeaderSearchDropdown.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		HeaderSearchbar,
		HeaderNotificationDropdown,
		HeaderProfileDropdown,
		HeaderSearchDropdown,
	},
	computed: {
		...mapGetters(['currentUser', 'getSearchResults']),
		results() {
			return this.getSearchResults;
		},
	},
};
</script>
