<template>
	<TodoDetails :show="true" :new="true" />
</template>

<script>
import TodoDetails from 'todos/TodoDetails';

export default {
	components: { TodoDetails },
};
</script>
