<template>
	<BaseContainer fieldset label="info">
		<h3>Due: {{ dueDate }}</h3>
		<h3>
			Status:
			<span class="uppercase text-amber-500">{{ todo.status }}</span>
		</h3>
		<DailyTodoRadio :is-daily="todo.daily" />
		<!-- todo tagovi za todose -->
		<p class="text-coolGray-300">
			Tu ce ic tagovi za todo il sta god odlucimo...
		</p>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import DailyTodoRadio from './DailyTodoRadio';
export default {
	components: { BaseContainer, DailyTodoRadio },
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	computed: {
		dueDate() {
			const date = this.todo.timestamp;
			const mo = date.toLocaleString('en', { month: 'long' });
			return `${mo} ${date.getDate()}, ${date.getFullYear()}`;
		},
	},
};
</script>
