<template>
	<BaseContainer fieldset label="Todos">
		<div class="space-y-6">
			<ProfileTodoItem
				v-for="todo in todos"
				:key="todo.id"
				:todo="todo"
			/>
		</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import ProfileTodoItem from 'profile/ProfileTodoItem.vue';

export default {
	components: { BaseContainer, ProfileTodoItem },
	props: {
		todos: {
			type: Object,
			required: true,
		},
	},
};
</script>
