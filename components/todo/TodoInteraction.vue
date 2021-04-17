<template>
	<div class="flex gap-4 items-center my-7">
		<InteractionIcon :type="interaction.type" />
		<InteractionDate :date="interaction.date" />
		<BaseContainer
			fieldset
			:label="interaction.type"
			class="py-6 flex-grow"
		>
			<p>{{ interaction.info }}</p>
		</BaseContainer>
	</div>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import InteractionIcon from './InteractionIcon';
import InteractionDate from './InteractionDate';
export default {
	components: { InteractionDate, BaseContainer, InteractionIcon },
	props: {
		interaction: {
			type: Object,
			required: true,
		},
	},
};
</script>
