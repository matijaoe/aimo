<template>
	<div class="flex flex-items-center gap-2 overflow-x-auto my-5">
		<div
			v-tooltip.left="todo.important ? 'Important' : 'Mark as important'"
			class="p-1 rounded-lg group hover:cursor-pointer"
			@click.stop="toggleImportant"
		>
			<IconStar
				class="fill-current transition"
				:class="starStyle"
				:fill="todo.important"
			/>
		</div>
		<div
			v-tooltip.left="todo.daily ? 'Repeats daily' : 'One time thing'"
			class="p-1 rounded-lg hover:cursor-pointer"
			@click.stop="toggleDaily"
		>
			<IconGlobeAlt class="fill-current transition" :class="globeStyle" />
		</div>
		<div
			v-tooltip.left="todo.done ? 'Completed' : 'In progress'"
			class="p-1 rounded-lg hover:cursor-pointer"
			@click.stop="toggleCompleted"
		>
			<IconCheck class="fill-current transition" :class="checkStyle" />
		</div>
		<BaseButton mode="fill">Submit engagement</BaseButton>
		<BaseButton mode="cta">Give Coins</BaseButton>
		<BaseButton mode="ghost">Give up</BaseButton>
	</div>
</template>

<script>
import BaseButton from 'UI/BaseButton';
import IconStar from 'icons/IconStar';
import IconGlobeAlt from 'icons/IconGlobeAlt';
import IconCheck from 'icons/IconCheck';
export default {
	components: { BaseButton, IconStar, IconGlobeAlt, IconCheck },
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	computed: {
		starStyle() {
			if (this.todo.important) {
				return ['text-amber-300'];
			} else {
				return ['text-gray-200', 'group-hover:text-amber-300'];
			}
		},
		globeStyle() {
			if (this.todo.daily) {
				return ['text-blue-400'];
			} else {
				return ['text-gray-200', 'group-hover:text-blue-400'];
			}
		},
		checkStyle() {
			if (this.todo.done) {
				return ['text-green-400'];
			} else {
				return ['text-gray-200', 'group-hover:text-green-400'];
			}
		},
	},
	methods: {
		toggleImportant() {
			if (!this.todo.approved) {
				this.$store.dispatch('todos/updateImportantStatus', {
					id: this.todo.id,
					important: !this.todo.important,
				});
			}
		},
		toggleDaily() {
			if (!this.todo.approved) {
				this.$store.dispatch('todos/updateDailyStatus', {
					id: this.todo.id,
					daily: !this.todo.daily,
				});
			}
		},
		toggleCompleted() {
			if (!this.todo.approved) {
				this.$store.dispatch('todos/updateIsDoneStatus', {
					id: this.todo.id,
					done: !this.todo.done,
				});
			}
		},
	},
};
</script>
