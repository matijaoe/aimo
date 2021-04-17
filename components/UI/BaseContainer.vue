<template>
	<fieldset
		v-if="fieldset"
		class="border-2 border-gray-100 p-4 rounded-lg"
		:class="styleColor"
	>
		<legend class="px-2 uppercase text-xs font-bold text-current">
			<h3>{{ label }}</h3>
		</legend>
		<slot />
	</fieldset>

	<article v-else class="border-2 border-gray-100 p-4 rounded-lg bg-white">
		<slot />
	</article>
</template>

<script>
export default {
	props: {
		fieldset: {
			type: Boolean,
			required: false,
			default: false,
		},
		label: {
			type: String,
			required: false,
			default: '',
		},
		colored: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {
		styleColor() {
			return this.colored ? ['bg-amber-100'] : ['bg-white'];
		},
	},
};
</script>
