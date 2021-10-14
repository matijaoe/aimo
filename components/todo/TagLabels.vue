<template>
	<div v-if="tags.length > 0" class="flex gap-2">
		<BaseTag
			v-for="tag in tags"
			:key="tag.name"
			:color="tag.color"
			class="
				transform
				hover:scale-110 hover:-rotate-6 hover:-translate-y-1
				transition
			"
			link
			:to="{ path: `/community/${tag.name}` }"
		>
			{{ tag.name }}
		</BaseTag>
	</div>
</template>

<script>
import BaseTag from 'UI/BaseTag.vue';
import { mapGetters } from 'vuex';
export default {
	components: { BaseTag },
	props: {
		categories: {
			type: Array,
			required: true,
		},
	},
	computed: {
		...mapGetters(['getCategoryById']),
		tags() {
			return this.categories.map((id) => this.getCategoryById(id));
		},
	},
};
</script>
