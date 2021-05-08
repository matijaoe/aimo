<template>
	<BaseContainer fieldset label="info">
		<h3>Created: {{ createdDate }}</h3>
		<VerifyIndicator label="Important:" :is-shown="todo.important" />
		<VerifyIndicator label="Daily:" :is-shown="todo.daily" />
		<VerifyIndicator label="Completed:" :is-shown="todo.done" />
		<VerifyIndicator
			v-if="hasPartner"
			label="Approved:"
			:is-shown="todo.approved"
		/>
		<TagLabels :categories="todo.categories" />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import dayjs from 'dayjs';
import VerifyIndicator from './VerifyIndicator';
import TagLabels from './TagLabels';
export default {
	components: { BaseContainer, VerifyIndicator, TagLabels },
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
	computed: {
		createdDate() {
			const dt = dayjs(this.todo.timestamp);
			const date = dt.format(`MMMM DD`);
			const time = dt.format(`HH:mm`);
			return `${date} at ${time}`;
		},
	},
};
</script>
