<template>
	<div class="flex gap-2 items-center">
		<h3 class="text-md">{{ label }}</h3>
		<IconCheck v-if="isShown" class="text-green-500" />
		<IconExit v-else class="text-red-500" />
	</div>
</template>

<script>
import IconCheck from 'icons/IconCheck';
import IconExit from 'icons/IconExit';

export default {
	components: { IconExit, IconCheck },
	props: {
		label: {
			type: String,
			required: false,
			default: '',
		},
		isShown: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
};
</script>
