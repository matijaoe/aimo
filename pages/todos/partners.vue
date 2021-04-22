<template>
	<div class="flex flex-wrap">
		<div class="w-full">
			<TabsWrapper :tabs="tabs" />
			<Nuxt />
		</div>
	</div>
</template>

<script>
import TabsWrapper from 'todos/TabsWrapper.vue';
export default {
	components: { TabsWrapper },
	data() {
		return {
			filterOption: 'partners',
			tabs: [],
		};
	},
	computed: {
		todos() {
			return this.$store.getters['todos/allTodos'];
		},
	},
	created() {
		const partners = this.todos.map((todo) => todo.partner);
		const distinctPartners = Array.from(new Set(partners));
		if (distinctPartners.includes('')) {
			const indexPersonal = distinctPartners.indexOf('');
			distinctPartners.splice(indexPersonal, 1);
			distinctPartners.unshift('personal');
		}
		for (const partner of distinctPartners) {
			const tab = {
				name: partner,
				link: `/todos/partners/${partner}`,
			};
			this.tabs.push(tab);
		}
	},
};
</script>
