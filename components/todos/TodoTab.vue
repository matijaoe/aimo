<template>
	<li>
		<BaseContainer
			class="border-amber-400 flex justify-center p-0"
			:class="tabStyle"
		>
			<!-- todo use BaseButton -->
			<button
				class="w-full py-3 px-6 font-semibold focus:outline-none"
				@click="changeRoute"
			>
				{{ label }}
			</button>
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
				? 'text-amber-900 bg-amber-300'
				: 'text-amber-400 bg-transparent';
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
