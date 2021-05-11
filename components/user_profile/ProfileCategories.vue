<template>
	<BaseContainer fieldset label="Categories">
		<div v-if="categories.length" class="flex flex-wrap gap-2">
			<BaseTag
				v-for="tag in categories"
				:key="tag.id"
				:color="tag.color"
				link
				:to="{ path: `/community/${tag.name}` }"
			>
				{{ tag.name }}
			</BaseTag>
		</div>
		<div v-else>
			<BaseTag>No categories found</BaseTag>
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
