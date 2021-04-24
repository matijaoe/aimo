<template>
	<div class="flex items-center bg-white border-b-2 border-gray-100">
		<label class="w-full flex items-center pl-2">
			<BaseButton
				v-tooltip.bottom="'Find'"
				mode="bland"
				class="block flex-shrink-0"
			>
				<div class="p-2">
					<IconSearch class="text-gray-400" size="sm" />
				</div>
			</BaseButton>
			<input
				v-model="searchTerm"
				type="search"
				class="p-3 w-full focus:outline-none border-none focus:ring-0 bg-transparent"
				placeholder="Find todo"
				@input="$emit('search', searchTerm)"
			/>
		</label>

		<BaseDropdown>
			<template slot="toggler">
				<button
					class="focus:outline-none focus:border-none rounded-lg block p-2 group"
				>
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
	data() {
		// todo - clear searchbar after changing route
		return {
			searchTerm: '',
		};
	},
};
</script>
