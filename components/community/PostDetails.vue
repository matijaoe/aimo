<template>
	<article class="grid col-1 gap-2 mt-2">
		<h3 class="text-2xl text-amber-500">{{ todo.name }}</h3>
		<TagLabels
			v-if="todo.categories.length > 0"
			:categories="todo.categories"
		/>
		<div v-else class="flex gap-2">
			<BaseTag> No categories </BaseTag>
		</div>
		<BaseContainer fieldset label="Description">
			<p>{{ todo.desc }}</p>
		</BaseContainer>
	</article>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import TagLabels from '../todo/TagLabels';
import BaseTag from '../UI/BaseTag';
export default {
	components: { BaseTag, BaseContainer, TagLabels },
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
};
</script>
