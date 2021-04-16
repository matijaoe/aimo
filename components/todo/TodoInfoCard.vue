<template>
	<BaseContainer fieldset label="info">
		<h3>Due: {{ dueDate }}</h3>
		<DailyTodoRadio :is-daily="todo.isDaily" />
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
