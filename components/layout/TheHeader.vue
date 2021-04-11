<template>
	<header class="flex space-between gap-8">
		<label
			class="flex items-center sm:flex-1 pl-3 text-sm sm:border-2 rounded-full border-gray-100 focus-within:ring-0 focus-within:border-gray-200"
		>
			<BaseButton v-tooltip.bottom="'Search'" mode="bland">
				<div class="p-1">
					<IconSearch class="text-gray-300" />
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
			<BaseButton mode="bland">
				<div class="p-1">
					<IconBell />
				</div>
			</BaseButton>
			<div class="relative">
				<button
					class="focus:outline-none rounded-full focus-within:ring-2 ring-amber-200 ring-offset-2 ring-offset-transparent block"
					@click="dropdownShown = !dropdownShown"
				>
					<BaseAvatar :src="currentUser.photo" />

					<transition name="dropdown">
						<BaseContainer
							v-if="dropdownShown"
							class="absolute right-0 mt-3 p-0 w-[180px] divide-y-2 divide-gray-100 text-left text-gray-700 z-50 bg-white"
						>
							<p class="p-3">
								Signed in as
								<nuxt-link
									class="font-bold hover:text-amber-500"
									:to="`/user/${$store.getters.currentUserId}`"
								>
									{{ currentUser.username }}
								</nuxt-link>
							</p>
							<ul class="py-1">
								<li>
									<nuxt-link
										:to="`/user/${$store.getters.currentUserId}`"
										class="px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
									>
										<IconUser size="sm" />
										<span>My Profile</span>
									</nuxt-link>
								</li>
								<li>
									<nuxt-link
										:to="`/user/${$store.getters.currentUserId}`"
										class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
									>
										<IconClipboardList size="sm" />
										<span>My todos</span>
									</nuxt-link>
								</li>
							</ul>
							<ul class="py-1">
								<li>
									<nuxt-link
										:to="`/user/${$store.getters.currentUserId}`"
										class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
									>
										<IconLogout size="sm" />
										<span>Log out</span>
									</nuxt-link>
								</li>
							</ul>
						</BaseContainer>
					</transition>
				</button>
			</div>
		</div>
	</header>
</template>

<script>
import IconBell from 'icons/IconBell.vue';
import IconSearch from 'icons/IconSearch.vue';
import IconUser from 'icons/IconUser.vue';
import IconClipboardList from 'icons/IconClipboardList.vue';
import IconLogout from 'icons/IconLogout.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseButton from 'UI/BaseButton.vue';
import BaseContainer from 'UI/BaseContainer.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseAvatar,
		BaseButton,
		IconBell,
		IconSearch,
		IconUser,
		IconClipboardList,
		IconLogout,
		BaseContainer,
	},
	data() {
		return {
			dropdownShown: false,
		};
	},
	computed: {
		...mapGetters(['currentUser']),
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
