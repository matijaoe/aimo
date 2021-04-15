<template>
	<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
		<a
			class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal hover:cursor-pointer transition duration-300 ease-in-out"
			:class="tabStyle"
			@click="changeRoute"
		>
			{{ label }}
		</a>
	</li>
</template>

<script>
export default {
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
				? 'text-white bg-amber-400'
				: 'text-amber-300 bg-white';
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
