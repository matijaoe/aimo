<template>
	<header class="flex gap-8">
		<HeaderSearchbar class="flex items-center sm:flex-1" />

		<div class="flex justify-end flex-1">
			<div class="flex items-center space-x-4 sm:space-x-8">
				<!-- Notifications dropdown-->
				<BaseDropdown>
					<template slot="toggler">
						<BaseButton
							v-tooltip.bottom="
								`You have ${
									notifyCount || 'no'
								} new notification${
									notifyCount === 1 ? '' : 's'
								}`
							"
							mode="bland"
							class="group"
						>
							<div class="p-1 relative">
								<IconBell
									class="opacity-75 group-hover:opacity-100"
								/>
								<p
									v-if="notifyCount"
									class="absolute top-0 right-0 text-[11px] bg-amber-400 rounded-full flex items-center w-[16px] h-[16px]"
								>
									<span class="flex-1">{{
										notifyCount
									}}</span>
								</p>
							</div>
						</BaseButton>
					</template>
					<BaseDropdownContent
						v-if="notifyCount"
						class="w-[300px] text-center"
					>
						<BaseDropdownList>
							<BaseDropdownItem class="font-semibold">
								You have
								<span
									class="font-bold text-lg mx-1 hover:text-amber-400 transition"
								>
									{{ notifyCount || 'no' }}
								</span>
								new notification{{
									notifyCount === 1 ? '' : 's'
								}}
							</BaseDropdownItem>
						</BaseDropdownList>
						<BaseDropdownList>
							<BaseDropdownItem
								v-for="notification in currentUser.notifications"
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
		</div>
	</header>
</template>

<script>
import IconBell from 'icons/IconBell.vue';
import IconChevronDown from 'icons/IconChevronDown.vue';
import IconUser from 'icons/IconUser.vue';
import IconClipboardList from 'icons/IconClipboardList.vue';
import IconLogout from 'icons/IconLogout.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseButton from 'UI/BaseButton.vue';
import BaseDropdown from 'UI/BaseDropdown.vue';
import BaseDropdownContent from 'UI/BaseDropdownContent.vue';
import BaseDropdownList from 'UI/BaseDropdownList.vue';
import BaseDropdownItem from 'UI/BaseDropdownItem.vue';
import HeaderSearchbar from 'layout/HeaderSearchbar.vue';

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
		IconUser,
		IconClipboardList,
		IconLogout,
		HeaderSearchbar,
	},
	directives: {
		clickOutside: vClickOutside.directive,
	},
	computed: {
		...mapGetters(['currentUser']),
		notifyCount() {
			return this.currentUser.notifications?.length || 0;
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
