<template>
	<div
		class="
			flex
			justify-center
			md:justify-start
			flex-items-center flex-wrap
			gap-2
			my-5
		"
	>
		<MarkAsCompleteButton
			v-if="!todo.approved"
			:is-completed="todo.done"
			:todo="todo"
			class="max-w-[300px]"
			@toggle-completed="toggleCompleted"
		/>
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
import { mapActions } from 'vuex';
import MarkAsCompleteButton from '@/components/todo/MarkAsCompleteButton';

export default {
	components: {
		BaseButton,
		IconExit,
		IconInfo,
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
