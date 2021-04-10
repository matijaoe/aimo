<template>
	<header class="flex space-between gap-8">
		<label
			class="flex items-center sm:flex-1 pl-4 text-sm sm:border-2 rounded-full border-gray-100 focus-within:ring-0 focus-within:border-gray-200"
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
				class="hidden sm:block flex-1 h-full bg-transparent focus:outline-none rounded-full px-4 focus:ring-0"
			/>
		</label>
		<div class="flex items-center space-x-4 sm:space-x-8 ml-auto">
			<BaseButton mode="bland">
				<div class="p-2">
					<IconBell />
				</div>
			</BaseButton>
			<button class="focus:outline-none rounded-full">
				<BaseAvatar :src="currentUser.photo" />
			</button>
		</div>
	</header>
</template>

<script>
import IconBell from 'icons/IconBell.vue';
import IconSearch from 'icons/IconSearch.vue';
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseButton from 'UI/BaseButton.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseAvatar,
		BaseButton,
		IconBell,
		IconSearch,
	},
	computed: {
		...mapGetters(['currentUser']),
	},
};
</script>
