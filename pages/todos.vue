<template>
	<BaseContainer class="flex adaptive-height" no-padding>
		<TodosSidebar
			class="w-[200px] overflow-y-auto flex-shrink-0"
			:partners="partners"
		/>
		<Nuxt />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import TodosSidebar from 'todos/TodosSidebar.vue';
export default {
	components: {
		BaseContainer,
		TodosSidebar,
	},
};
</script>

<style scoped>
.adaptive-height {
	height: calc(100vh - 40px - 2rem - 2rem - 22px - 1rem);
}
</style>
