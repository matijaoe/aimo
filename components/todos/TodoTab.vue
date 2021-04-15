<template>
	<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
		<BaseContainer
			class="border-amber-300 flex justify-center p-0"
			:class="tabStyle"
		>
			<!-- todo use BaseButton -->
			<button
				class="w-full p-3 font-semibold focus:outline-none"
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
