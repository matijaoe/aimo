<template>
	<div class="flex gap-2 items-center">
		<h3 class="text-md">Daily:</h3>
		<IconCheck v-if="daily" class="text-green-500" />
		<IconExit v-else class="text-red-500" />
	</div>
</template>

<script>
import IconCheck from 'icons/IconCheck';
import IconExit from 'icons/IconExit';

export default {
	components: { IconExit, IconCheck },
	props: {
		daily: {
			type: Boolean,
			required: true,
		},
	},
};
</script>
