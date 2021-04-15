<template>
	<div class="my-4">
		<BaseButton v-if="!filterShow" mode="fill" @click="toggleShowFilter"
			>Filters</BaseButton
		>
		<BaseContainer
			v-else
			class="flex-col items-center justify-center md:justify-start px-2 md:px-4 py-2 space-x-4 text-base rounded-lg bg-gray-100"
		>
			<header class="flex justify-between">
				<h2>Todo Filter</h2>
				<BaseButton @click="toggleShowFilter">
					<IconExit
						class="text-black hover:cursor-pointer"
					></IconExit>
				</BaseButton>
			</header>
			<div class="flex py-2">
				<FilterOption
					v-model="filterOption"
					label="Default"
					input-value="default"
					:checked="optionCheck === 'default'"
				/>
				<FilterOption
					v-model="filterOption"
					label="By Partner"
					input-value="partners"
					:checked="optionCheck === 'partners'"
				/>
			</div>
		</BaseContainer>
	</div>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseButton from 'UI/BaseButton.vue';
import IconExit from '../app_icons/IconExit';
import FilterOption from './FilterOption.vue';

export default {
	components: {
		IconExit,
		BaseContainer,
		FilterOption,
		BaseButton,
	},
	data() {
		return {
			filterOption: 'default',
			filterShow: false,
		};
	},
	computed: {
		optionCheck() {
			if (this.$route.path === '/todos') {
				return 'default';
			}
			return 'partners';
		},
	},
	methods: {
		toggleShowFilter() {
			this.filterShow = !this.filterShow;
		},
	},
};
</script>
