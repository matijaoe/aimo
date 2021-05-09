<template>
	<div class="space-y-4">
		<div class="flex flex-col gap-2 justify-center ml-2 col-span-1">
			<h3 class="text-lg">{{ todo.name }}</h3>
			<TagLabels
				v-if="todo.categories.length > 0"
				:categories="todo.categories"
			/>
		</div>
		<div
			v-if="todo.desc"
			class="border-2 border-dashed border-gray-200 bg-gray-50 rounded-lg p-4 text-sm"
		>
			<p>{{ todo.desc }}</p>
		</div>
	</div>
</template>

<script>
import TagLabels from '../todo/TagLabels';

export default {
	components: { TagLabels },
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
};
</script>
