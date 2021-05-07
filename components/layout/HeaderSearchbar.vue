<template>
	<label
		class="pr-3 sm:pr-0 pl-3 text-sm sm:border-2 rounded-full border-transparent focus-within:ring-0 focus-within:bg-gray-100"
	>
		<BaseButton
			v-tooltip.bottom="'Search'"
			mode="bland"
			class="bg-amber-100"
		>
			<div class="p-1 hover:bg-gray-100">
				<IconSearch class="text-gray-400" />
			</div>
		</BaseButton>
		<input
			id=""
			v-model="searchTerm"
			type="search"
			name=""
			placeholder="Search anything"
			class="hidden sm:block bg-transparent h-full focus:outline-none border-none rounded-full px-4 focus:ring-0 flex-1 font-medium"
			@input="searchSomething(searchTerm)"
		/>
	</label>
</template>

<script>
import IconSearch from 'icons/IconSearch.vue';
import BaseButton from 'UI/BaseButton.vue';

export default {
	components: { IconSearch, BaseButton },
	data() {
		return {
			searchTerm: '',
		};
	},
	methods: {
		searchSomething() {
			this.$store.dispatch('searchAnything', this.searchTerm);
		},
	},
};
</script>

<style scoped>
input::placeholder {
	font-weight: normal;
}
</style>
