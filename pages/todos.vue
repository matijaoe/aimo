<template>
	<BaseContainer class="flex custom-height" no-padding>
		<TodosSidebar
			class="w-[200px] overflow-y-auto flex-shrink-0"
			:partners="partners"
		/>
		<transition>
			<Nuxt />
		</transition>
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
.custom-height {
	height: calc(100vh - 9rem);
}
</style>
