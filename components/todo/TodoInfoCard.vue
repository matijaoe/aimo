<template>
	<BaseContainer fieldset label="info">
		<TagLabels :categories="todo.categories" />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import TagLabels from './TagLabels';
export default {
	components: {
		BaseContainer,
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
