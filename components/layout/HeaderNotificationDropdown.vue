<template>
	<BaseDropdown>
		<template slot="toggler">
			<BaseButton
				v-tooltip.bottom="
					`You have ${notifyCount || 'no'} new notification${
						notifyCount === 1 ? '' : 's'
					}`
				"
				mode="bland"
				class="group"
			>
				<div class="p-2 relative hover:bg-gray-100">
					<IconBell class="opacity-75 group-hover:opacity-100" />
					<p
						v-if="notifyCount"
						class="absolute top-0.5 right-0 text-[10px] bg-amber-400 rounded-full flex items-center w-[18px] h-[18px]"
					>
						<span class="flex-1">{{ notifyCount }}</span>
					</p>
				</div>
			</BaseButton>
		</template>
		<BaseDropdownContent v-if="notifyCount" class="w-[400px] text-center">
			<BaseDropdownList>
				<BaseDropdownItem class="font-semibold text-center">
					You have
					<span class="font-bold text-lg mx-0.5">
						{{ notifyCount || 'no' }}
					</span>
					new notification{{ notifyCount === 1 ? '' : 's' }}
				</BaseDropdownItem>
			</BaseDropdownList>
			<BaseDropdownList>
				<BaseDropdownItem
					v-for="notification in notifications"
					:key="notification"
					link
				>
					<BaseNotification color="blue">
						<p>{{ notification }}</p>
					</BaseNotification>
				</BaseDropdownItem>
			</BaseDropdownList>
		</BaseDropdownContent>
	</BaseDropdown>
</template>

<script>
import IconBell from 'icons/IconBell.vue';
import BaseButton from 'UI/BaseButton.vue';
import BaseNotification from 'UI/BaseNotification.vue';

import BaseDropdown from 'UI/BaseDropdown.vue';
import BaseDropdownContent from 'UI/BaseDropdownContent.vue';
import BaseDropdownList from 'UI/BaseDropdownList.vue';
import BaseDropdownItem from 'UI/BaseDropdownItem.vue';

export default {
	components: {
		BaseNotification,
		BaseButton,
		IconBell,
		BaseDropdown,
		BaseDropdownContent,
		BaseDropdownList,
		BaseDropdownItem,
	},
	props: ['notifications'],
	computed: {
		notifyCount() {
			return this.notifications?.length || 0;
		},
	},
};
</script>
