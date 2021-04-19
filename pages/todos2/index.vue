<template>
	<BaseContainer class="flex p-0 h-[650px]">
		<TodosSidebar
			class="w-[200px] overflow-y-auto flex-shrink-0"
			:partners="partners"
		/>
		<TodosMain class="flex-1 overflow-y-auto" />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import TodosSidebar from 'todos/new/TodosSidebar.vue';
import TodosMain from 'todos/new/TodosMain.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseContainer,
		TodosSidebar,
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
