<template>
	<button
		class="
			py-3
			w-full
			rounded-lg
			uppercase
			text-xs
			font-bold
			border-none
			foucs:border-none
			focus:outline-none
			focus:border-amber-300
			focus:ring
			focus:ring-amber-200
			focus:ring-opacity-50
			transition
		"
		:class="completedColor"
		@click="$emit('toggle-completed')"
	>
		<p v-if="isCompleted" class="flex items-center justify-center gap-2">
			<IconSparkles size="sm" />
			Completed
			<IconSparkles size="sm" />
		</p>
		<p v-else class="flex items-center justify-center gap-2">
			Mark as complete
			<IconCheck size="sm" />
		</p>
	</button>
</template>

<script>
import IconSparkles from 'icons/IconSparkles';
import IconCheck from 'icons/IconCheck';

export default {
	components: {
		IconSparkles,
		IconCheck,
	},
	props: ['isCompleted', 'todo'],
	emits: ['toggleCompleted'],
	computed: {
		completedColor() {
			if (this.isCompleted) {
				return [
					'bg-green-300 text-green-900 hover:bg-green-400 focus:border-green-300 focus:ring-green-200',
				];
			} else {
				return [
					'bg-amber-300 text-amber-900 hover:bg-amber-400 focus:border-amber-300 focus:ring-amber-200',
				];
			}
		},
	},
};
</script>
