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
				class="p-3 w-full focus:outline-none"
				placeholder="Find todo"
			/>
		</label>

		<BaseDropdown>
			<template slot="toggler">
				<button class="focus:outline-none rounded-lg block p-2 group">
					<IconDotsVertical
						class="text-gray-300 group-hover:text-gray-900 transition"
					/>
				</button>
			</template>
			<BaseDropdownContent>
				<BaseDropdownList>
					<BaseDropdownItem option @click="$emit('sort', 'reset')">
						<IconFilter size="sm" />
						Reset Sort
					</BaseDropdownItem>
					<BaseDropdownItem option @click="$emit('sort', 'asc')">
						<IconAscending size="sm" />
						Sort A-Z
					</BaseDropdownItem>
					<BaseDropdownItem option @click="$emit('sort', 'desc')">
						<IconDescending size="sm" />
						Sort Z-A
					</BaseDropdownItem>
				</BaseDropdownList>
			</BaseDropdownContent>
		</BaseDropdown>
	</div>
</template>

<script>
import IconDotsVertical from 'icons/IconDotsVertical.vue';
import IconSearch from 'icons/IconSearch.vue';
import IconFilter from 'icons/IconFilter.vue';
import IconAscending from 'icons/IconAscending.vue';
import IconDescending from 'icons/IconDescending.vue';
import BaseButton from 'UI/BaseButton.vue';
import BaseDropdown from 'UI/BaseDropdown.vue';
import BaseDropdownContent from 'UI/BaseDropdownContent.vue';
import BaseDropdownList from 'UI/BaseDropdownList.vue';
import BaseDropdownItem from 'UI/BaseDropdownItem.vue';

export default {
	components: {
		IconDotsVertical,
		IconSearch,
		IconFilter,
		IconAscending,
		IconDescending,
		BaseButton,
		BaseDropdown,
		BaseDropdownContent,
		BaseDropdownList,
		BaseDropdownItem,
	},
	emits: ['search', 'sort'],
};
</script>
