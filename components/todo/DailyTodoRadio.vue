<template>
	<div class="flex gap-2 items-center">
		<h3 class="text-md">Daily:</h3>
		<IconCheck v-if="isDaily" class="text-green-500" />
		<IconExit v-else class="text-red-600" />
	</div>
</template>

<script>
import IconCheck from '../app_icons/IconCheck';
import IconExit from '../app_icons/IconExit';
export default {
	components: { IconExit, IconCheck },
	props: {
		isDaily: {
			type: Boolean,
			required: true,
		},
	},
};
</script>
