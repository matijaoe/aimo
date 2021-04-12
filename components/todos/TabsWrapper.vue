<template>
	<div class="flex flex-wrap">
		<div class="w-full">
			<ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
				<Tab
					v-for="option in filterOptions"
					:key="option"
					:label="option"
					:tab-id="option"
					:opened-tab="openTab"
					@toggle-tabs="toggleTabs"
				></Tab>
			</ul>
			<div>
				<TodoItem
					v-for="todo in filteredTodos"
					:key="todo.id"
					:title="todo.title"
					:partner="todo.partner"
					:desc="todo.desc"
				></TodoItem>
			</div>
		</div>
	</div>
</template>

<script>
import Tab from './TodoTab';
import TodoItem from './TodoItem.vue';
export default {
	components: { Tab, TodoItem },
	props: {
		filterOption: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			openTab: 'all',
		};
	},
	computed: {
		todos() {
			return this.$store.getters['todos/allTodos'];
		},
		filterOptions() {
			if (this.filterOption === 'default') {
				this.openTab = 'all';
				return ['all'];
			} else if (this.filterOption === 'byPartner') {
				const partners = this.todos.map((todo) => todo.partner);
				const distinctPartners = Array.from(new Set(partners));
				if (distinctPartners.includes('')) {
					const indexPersonal = distinctPartners.indexOf('');
					distinctPartners.splice(indexPersonal, 1);
					distinctPartners.unshift('personal');
				}
				this.openTab = distinctPartners[0];
				return distinctPartners;
			}
			return [];
		},
		filteredTodos() {
			if (this.filterOption === 'byPartner') {
				if (this.openTab === 'personal') {
					return this.todos.filter((todo) => todo.partner === '');
				}
				return this.todos.filter(
					(todo) => todo.partner === this.openTab
				);
			}
			return this.todos;
		},
	},
	methods: {
		toggleTabs(tabNumber) {
			this.openTab = tabNumber;
		},
	},
};
</script>
