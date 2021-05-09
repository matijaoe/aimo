<template>
	<BaseContainer fieldset label="info">
		<!-- <VerifyIndicator label="Important:" :is-shown="todo.important" />
		<VerifyIndicator label="Daily:" :is-shown="todo.daily" />
		<VerifyIndicator label="Completed:" :is-shown="todo.done" />
		<VerifyIndicator
			v-if="hasPartner"
			label="Approved:"
			:is-shown="todo.approved"
		/> -->
		<TagLabels :categories="todo.categories" />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
// import VerifyIndicator from './VerifyIndicator';
import TagLabels from './TagLabels';
export default {
	components: {
		BaseContainer,
		// VerifyIndicator,
		TagLabels,
	},
	props: {
		todo: {
			type: Object,
			required: true,
		},
		hasPartner: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {},
};
</script>
