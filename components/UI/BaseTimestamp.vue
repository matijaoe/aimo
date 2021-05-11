<template>
	<p class="text-xs text-gray-300 flex items-center gap-1 flex-shrink-0">
		<IconClock />
		{{ date }}
	</p>
</template>

<script>
import IconClock from 'icons/IconClock';
export default {
	components: {
		IconClock,
	},
	props: ['date'],
};
</script>
