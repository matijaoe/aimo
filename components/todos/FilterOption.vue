<template>
	<div class="flex justify-center items-center py-0.5 px-2">
		<input
			:id="inputValue"
			type="radio"
			:value="inputValue"
			:checked="checked"
			name="todoFilter"
			class="mr-1"
			@input="changeRoute"
		/>
		<label :for="inputValue">{{ label }}</label>
	</div>
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
