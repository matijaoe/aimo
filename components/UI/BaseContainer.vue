<template>
	<fieldset
		v-if="fieldset"
		class="border-2 border-gray-100 rounded-lg"
		:class="[styleColor, stylePadding]"
	>
		<legend class="px-2 uppercase text-xs font-bold text-current">
			<h3>{{ label }}</h3>
		</legend>
		<slot />
	</fieldset>

	<article
		v-else
		class="border-2 border-gray-100 rounded-lg bg-white"
		:class="[stylePadding]"
	>
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
		noPadding: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {
		styleColor() {
			return this.colored ? ['bg-amber-100'] : ['bg-white'];
		},
		stylePadding() {
			if (this.noPadding) {
				return ['p-0'];
			} else {
				return ['p-4'];
			}
		},
	},
};
</script>
