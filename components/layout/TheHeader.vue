<template>
	<header class="flex gap-8">
		<HeaderSearchbar class="flex items-center sm:flex-1" />

		<div class="flex justify-end flex-1">
			<div
				v-if="currentUser"
				class="flex items-center space-x-4 sm:space-x-8"
			>
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

import { mapGetters } from 'vuex';

import vClickOutside from 'v-click-outside';

export default {
	components: {
		HeaderSearchbar,
		HeaderNotificationDropdown,
		HeaderProfileDropdown,
	},
	directives: {
		clickOutside: vClickOutside.directive,
	},
	computed: {
		...mapGetters(['currentUser']),
	},
};
</script>
