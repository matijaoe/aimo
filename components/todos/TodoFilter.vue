<template>
	<div class="my-4">
		<BaseContainer class="p-2 text-base bg-gray-100">
			<div class="flex gap-2 py-1 px-2">
				<FilterOption
					v-model="filterOption"
					label="Default"
					input-value="default"
					:checked="optionCheck === 'default'"
				/>
				<FilterOption
					v-model="filterOption"
					label="Per Partner"
					input-value="partners"
					:checked="optionCheck === 'partners'"
				/>
			</div>
		</BaseContainer>
	</div>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import FilterOption from './FilterOption.vue';

export default {
	components: {
		BaseContainer,
		FilterOption,
	},
	data() {
		return {
			filterOption: 'default',
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
};
</script>
