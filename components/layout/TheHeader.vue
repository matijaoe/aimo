<template>
	<header class="flex gap-8">
		<div v-click-outside="away" class="rounded-lg" @click="toggle">
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
import vClickOutside from 'v-click-outside';

export default {
	components: {
		HeaderSearchbar,
		HeaderNotificationDropdown,
		HeaderProfileDropdown,
		HeaderSearchDropdown,
	},
	directives: {
		clickOutside: vClickOutside.directive,
	},
	provide() {
		return {
			sharedState: this.sharedState,
		};
	},
	data() {
		return {
			sharedState: {
				active: false,
			},
		};
	},
	computed: {
		...mapGetters(['currentUser', 'getSearchResults']),
		results() {
			return this.getSearchResults;
		},
	},

	methods: {
		toggle() {
			this.sharedState.active = !this.sharedState.active;
		},
		away() {
			this.sharedState.active = false;
		},
	},
};
</script>
