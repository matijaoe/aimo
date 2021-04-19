<template>
	<BaseContainer class="flex p-0 h-[650px]">
		<TodosSidebar
			class="w-[200px] overflow-y-auto flex-shrink-0"
			:partners="partners"
		/>
		<div class="flex-1 bg-gray-100">
			<TodosSearchbar />
			<TodosMain class="flex-1 overflow-y-auto" />
		</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import TodosSidebar from 'todos/new/TodosSidebar.vue';
import TodosSearchbar from 'todos/new/TodosSearchbar.vue';
import TodosMain from 'todos/new/TodosMain.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseContainer,
		TodosSidebar,
		TodosSearchbar,
		TodosMain,
	},
	computed: {
		...mapGetters(['currentUserId']),
		...mapGetters('partners', ['getPartnersById']),
		partners() {
			return this.getPartnersById(this.currentUserId);
		},
	},
};
</script>
