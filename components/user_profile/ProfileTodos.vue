<template>
	<BaseContainer fieldset label="Todos">
		<div v-if="todos.length > 0" class="space-y-6">
			<ProfileTodoItem
				v-for="todo in todos"
				:key="todo.id"
				:todo="todo"
			/>
		</div>
		<BaseTag v-else>No todos found</BaseTag>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseTag from 'UI/BaseTag.vue';
import ProfileTodoItem from 'profile/ProfileTodoItem.vue';

export default {
	components: { BaseContainer, ProfileTodoItem, BaseTag },
	props: {
		todos: {
			type: Array,
			required: true,
		},
	},
};
</script>
