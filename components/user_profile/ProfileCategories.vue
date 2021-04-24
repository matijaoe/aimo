<template>
	<BaseContainer fieldset label="Categories">
		<div class="flex flex-wrap gap-2">
			<BaseTag v-for="tag in categories" :key="tag.id" :color="tag.color">
				{{ tag.name }}
			</BaseTag>
		</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseTag from 'UI/BaseTag.vue';

export default {
	components: {
		BaseContainer,
		BaseTag,
	},
	props: ['categories'],
};
</script>
