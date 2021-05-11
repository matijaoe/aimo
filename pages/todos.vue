<template>
	<BaseContainer class="flex custom-height" no-padding>
		<TodosSidebar
			class="w-[50px] md:w-[200px] overflow-y-auto overflow-x-hidden flex-shrink-0"
			@new-todo="toggleNewTodo"
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
	mounted() {
		const isNew = this.$route.query.newtodo;
		if (isNew) {
			setTimeout(() => {
				this.toggleNewTodo();
			}, 600);
		}
	},
	methods: {
		toggleNewTodo() {
			document.getElementById('add-todo').click();
		},
	},
};
</script>

<style scoped>
.custom-height {
	height: calc(100vh - 9rem);
}
</style>
