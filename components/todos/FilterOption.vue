<template>
	<div class="flex justify-center items-center py-0.5 px-2">
		<input
			:id="inputValue"
			type="radio"
			:value="inputValue"
			:checked="checked"
			name="todoFilter"
			class="mr-1"
			@input="$emit('input', $event.target.value)"
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
};
</script>
