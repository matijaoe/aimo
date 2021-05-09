<template>
	<div class="flex flex-items-center flex-wrap gap-2 my-5">
		<!-- <div
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
		</div> -->

		<MarkAsCompleteButton
			:is-completed="todo.done"
			:todo="todo"
			class="max-w-[300px]"
			@toggle-completed="toggleCompleted"
		/>
		<BaseButton mode="fill">
			Submit engagement
			<IconDocumentReport size="sm" />
		</BaseButton>
		<BaseButton mode="info"
			>Give Coins
			<IconInfo size="sm" />
		</BaseButton>
		<BaseButton mode="warn"
			>Give up
			<IconExit size="sm" />
		</BaseButton>
	</div>
</template>

<script>
import BaseButton from 'UI/BaseButton';
import IconExit from 'icons/IconExit';
import IconInfo from 'icons/IconInfo';
import IconDocumentReport from 'icons/IconDocumentReport';
import MarkAsCompleteButton from '@/components/todo/MarkAsCompleteButton';

import { mapActions } from 'vuex';

export default {
	components: {
		BaseButton,
		IconExit,
		IconInfo,
		IconDocumentReport,
		// IconStar,
		// IconGlobeAlt,
		MarkAsCompleteButton,
	},
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
		...mapActions('todos', ['updateTodo']),
		toggleImportant() {
			if (!this.todo.approved) {
				this.updateTodo({
					...this.todo,
					id: this.todo.id,
					important: !this.todo.important,
				});
			}
		},
		toggleDaily() {
			if (!this.todo.approved) {
				this.updateTodo({
					...this.todo,
					id: this.todo.id,
					daily: !this.todo.daily,
				});
			}
		},
		toggleCompleted() {
			if (!this.todo.approved) {
				this.updateTodo({
					...this.todo,
					id: this.todo.id,
					done: !this.todo.done,
				});
			}
		},
	},
};
</script>
