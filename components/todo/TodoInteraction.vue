<template>
	<div class="grid grid-cols-5 gap-8">
		<div class="flex gap-4 items-center">
			<InteractionIcon :type="interaction.type" />
			<InteractionDate :date="interaction.date" />
		</div>
		<BaseContainer fieldset :label="interaction.type" class="col-span-4">
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
