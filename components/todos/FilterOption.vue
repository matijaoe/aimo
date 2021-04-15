<template>
	<label
		class="flex justify-center gap-2 items-center py-2 px-4 hover:bg-gray-200 transition rounded-lg cursor-pointer"
	>
		<input
			:id="inputValue"
			type="radio"
			:value="inputValue"
			:checked="checked"
			name="todoFilter"
			class="cursor-pointer"
			@input="changeRoute"
		/>
		{{ label }}
	</label>
</template>

<script>
export default {
	props: {
		inputValue: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		checked: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		changeRoute() {
			const path = this.inputValue === 'default' ? '' : this.inputValue;
			if (this.$route.path === '/todos/' + path) return;
			this.$router.replace(`/todos${path === '' ? '' : `/${path}`}`);
		},
	},
};
</script>
