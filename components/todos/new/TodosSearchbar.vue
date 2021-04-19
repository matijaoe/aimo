<template>
	<div class="flex items-center bg-white">
		<label class="w-full flex items-center">
			<BaseButton
				v-tooltip.bottom="'Search'"
				mode="bland"
				class="block flex-shrink-0"
			>
				<div class="p-2 ml-2">
					<IconSearch class="text-gray-400" size="sm" />
				</div>
			</BaseButton>
			<input
				type="search"
				class="p-2 w-full focus:outline-none"
				placeholder="Find todo"
			/>
		</label>
		<button class="focus:outline-none rounded-lg block p-2 group">
			<IconDotsVertical
				class="text-gray-300 group-hover:text-gray-900 transition"
			/>
		</button>
	</div>
</template>

<script>
import IconDotsVertical from 'icons/IconDotsVertical.vue';
import IconSearch from 'icons/IconSearch.vue';
import BaseButton from 'UI/BaseButton.vue';

export default {
	components: {
		IconDotsVertical,
		IconSearch,
		BaseButton,
	},
};
</script>
