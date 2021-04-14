<template>
	<header class="flex space-between gap-8">
		<!-- Searchbar -->
		<label
			class="flex items-center sm:flex-1 pl-3 text-sm sm:border-2 rounded-full border-transparent focus-within:ring-0 focus-within:border-gray-100"
		>
			<BaseButton
				v-tooltip.bottom="'Search'"
				mode="bland"
				class="bg-amber-100"
			>
				<div class="p-1">
					<IconSearch class="text-amber-400" />
				</div>
			</BaseButton>
			<input
				id=""
				type="search"
				name=""
				placeholder="Search anything"
				class="hidden sm:block bg-transparent h-full focus:outline-none rounded-full px-4 focus:ring-0 flex-1"
			/>
		</label>
		<div class="flex items-center space-x-4 sm:space-x-8 ml-auto">
			<!-- Notifications dropdown-->
			<BaseDropdown>
				<template slot="toggler">
					<BaseButton
						v-tooltip.bottom="
							`You have ${notifyCount || 'no'} new notifications`
						"
						mode="bland"
						class="group"
					>
						<div class="p-1 relative">
							<IconBell
								class="opacity-75 group-hover:opacity-100"
							/>
							<p
								class="absolute top-0 right-0 text-[11px] bg-amber-400 rounded-full flex items-center w-[16px] h-[16px]"
							>
								<span class="flex-1">{{ notifyCount }}</span>
							</p>
						</div>
					</BaseButton>
				</template>
				<BaseDropdownContent class="w-[300px] text-center">
					<BaseDropdownList>
						<BaseDropdownItem class="font-semibold">
							You have
							<span
								class="font-bold text-lg mx-1 hover:text-amber-400 transition"
							>
								{{ notifyCount }}
							</span>
							new notifications
						</BaseDropdownItem>
					</BaseDropdownList>
					<BaseDropdownList>
						<BaseDropdownItem
							v-for="notification in notifications"
							:key="notification"
							link
						>
							{{ notification }}
						</BaseDropdownItem>
					</BaseDropdownList>
				</BaseDropdownContent>
			</BaseDropdown>

			<!-- Profile dropdown-->
			<BaseDropdown>
				<template slot="toggler">
					<button
						class="focus:outline-none rounded-full focus-within:ring-2 ring-amber-200 ring-offset-2 block group"
					>
						<div
							v-tooltip.bottom="'Your profile'"
							class="flex items-center space-x-3"
						>
							<IconChevronDown
								class="opacity-75 group-hover:opacity-100"
							/>
							<BaseAvatar :src="currentUser.photo" />
						</div>
					</button>
				</template>
				<BaseDropdownContent>
					<BaseDropdownList>
						<BaseDropdownItem>
							<nuxt-link
								:to="`/user/${$store.getters.currentUserId}`"
							>
								Signed in as
								<span
									class="font-bold hover:text-amber-400 transition"
								>
									{{ currentUser.username }}
								</span>
							</nuxt-link>
						</BaseDropdownItem>
					</BaseDropdownList>

					<BaseDropdownList>
						<BaseDropdownItem
							link
							:to="`/user/${$store.getters.currentUserId}`"
						>
							<IconUser size="sm" />
							<span>My profile</span>
						</BaseDropdownItem>
						<BaseDropdownItem link to="/todos">
							<IconClipboardList size="sm" />
							<span>My todos</span>
						</BaseDropdownItem>
					</BaseDropdownList>

					<BaseDropdownList>
						<BaseDropdownItem link to="/home">
							<IconLogout size="sm" />
							<span>Log out</span>
						</BaseDropdownItem>
					</BaseDropdownList>
				</BaseDropdownContent>
			</BaseDropdown>
		</div>
	</header>
</template>

<script>
import IconBell from 'icons/IconBell.vue';
import IconChevronDown from 'icons/IconChevronDown.vue';
import IconSearch from 'icons/IconSearch.vue';
import IconUser from 'icons/IconUser.vue';
import IconClipboardList from 'icons/IconClipboardList.vue';
import IconLogout from 'icons/IconLogout.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseButton from 'UI/BaseButton.vue';
import BaseDropdown from 'UI/BaseDropdown.vue';
import BaseDropdownContent from 'UI/BaseDropdownContent.vue';
import BaseDropdownList from 'UI/BaseDropdownList.vue';
import BaseDropdownItem from 'UI/BaseDropdownItem.vue';

import { mapGetters } from 'vuex';

import vClickOutside from 'v-click-outside';

export default {
	components: {
		BaseDropdown,
		BaseDropdownContent,
		BaseDropdownList,
		BaseDropdownItem,
		BaseAvatar,
		BaseButton,
		IconBell,
		IconChevronDown,
		IconSearch,
		IconUser,
		IconClipboardList,
		IconLogout,
	},
	directives: {
		clickOutside: vClickOutside.directive,
	},
	data() {
		return {
			// notifications: [
			// 	'Matija gave you recognition',
			// 	'Zoki commented on your post',
			// 	'Patrik beat your streak',
			// 	'Lorena loves you and takes care of you',
			// ],
		};
	},
	computed: {
		...mapGetters(['currentUser']),
		notifyCount() {
			return this.notifications.length;
		},
		notifications() {
			const userId = this.$store.getters.currentUserId;

			const users = this.$store.getters['users/users'];

			const user = users.find((u) => (u.username = userId));

			return user.notifications || [];
		},
	},
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
	transition: all 300ms;
}
.dropdown-enter,
.dropdown-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
