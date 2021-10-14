<template>
	<BaseDropdown>
		<template slot="toggler">
			<button
				class="
					focus:outline-none focus:border-none
					rounded-full
					focus-within:ring-2
					ring-amber-200 ring-offset-2
					block
					group
					hover:bg-gray-100
				"
			>
				<div
					v-tooltip.bottom="'Your profile'"
					class="flex items-center space-x-3"
				>
					<div class="p-1">
						<IconChevronDown
							class="opacity-75 group-hover:opacity-100"
						/>
					</div>
					<BaseAvatar :src="user.photo" />
				</div>
			</button>
		</template>
		<BaseDropdownContent>
			<BaseDropdownList>
				<BaseDropdownItem>
					<nuxt-link :to="`/user/${$store.getters.currentUserId}`">
						Signed in as
						<span class="font-bold hover:text-amber-400 transition">
							{{ user.username }}
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
				<BaseDropdownItem link to="/home" @click="logout">
					<IconLogout size="sm" />
					<span>Log out</span>
				</BaseDropdownItem>
			</BaseDropdownList>
		</BaseDropdownContent>
	</BaseDropdown>
</template>

<script>
import BaseDropdown from 'UI/BaseDropdown.vue';
import BaseDropdownContent from 'UI/BaseDropdownContent.vue';
import BaseDropdownList from 'UI/BaseDropdownList.vue';
import BaseDropdownItem from 'UI/BaseDropdownItem.vue';
import IconChevronDown from 'icons/IconChevronDown.vue';
import IconUser from 'icons/IconUser.vue';
import IconClipboardList from 'icons/IconClipboardList.vue';
import IconLogout from 'icons/IconLogout.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';
import { mapActions } from 'vuex';

export default {
	components: {
		BaseDropdown,
		BaseDropdownContent,
		BaseDropdownList,
		BaseDropdownItem,
		BaseAvatar,
		IconChevronDown,
		IconUser,
		IconClipboardList,
		IconLogout,
	},
	props: ['user'],
	methods: {
		...mapActions(['logout']),
	},
};
</script>
