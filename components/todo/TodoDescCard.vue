<template>
	<BaseContainer fieldset label="description">
		<p>{{ desc || 'No Description for this todo.' }}</p>
	</BaseContainer>
</template>

<script>
import BaseContainer from '../UI/BaseContainer';
export default {
	components: { BaseContainer },
	props: {
		desc: {
			type: String,
			required: true,
		},
	},
};
</script>
