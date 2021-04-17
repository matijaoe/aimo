<template>
	<div>
		<TodoInteraction
			v-for="interaction in interactions"
			:key="interaction.id"
			:interaction="interaction"
		/>
	</div>
</template>

<script>
import TodoInteraction from './TodoInteraction';
export default {
	components: { TodoInteraction },
	props: {
		interactions: {
			type: Array,
			required: true,
		},
	},
};
</script>
