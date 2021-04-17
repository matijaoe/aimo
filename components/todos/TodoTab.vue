<template>
	<li>
		<BaseContainer class="flex justify-center p-0" :class="tabStyle">
			<!-- todo use BaseButton -->
			<NuxtLink
				class="py-3 px-6 font-semibold hover:border-amber-400"
				:to="link"
			>
				{{ label }}
			</NuxtLink>
		</BaseContainer>
	</li>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';

export default {
	components: { BaseContainer },
	props: {
		label: {
			type: String,
			required: false,
			default: 'Tab',
		},
		link: {
			type: String,
			required: true,
		},
	},
	computed: {
		tabStyle() {
			return this.$route.path === this.link
				? 'text-amber-500 border-amber-400'
				: 'text-gray-300 bg-transparent';
		},
	},
	methods: {
		changeRoute() {
			if (this.$route.path === this.link) return;
			this.$router.replace(this.link);
		},
	},
};
</script>
