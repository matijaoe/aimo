<template>
	<div class="flex gap-2 items-center">
		<h3 class="text-md">{{ label }}</h3>
		<transition
			enter-active-class="transition-all duration-800 ease-out-quad"
			leave-active-class="transition-all duration-800 ease-in-quad"
			enter-class="opacity-0 scale-70"
			enter-to-class="opacity-100 scale-100"
			leave-class="opacity-100 scale-100"
			leave-to-class="opacity-0 scale-70"
			mode="out-in"
		>
			<IconCheck v-if="isShown" class="text-green-500" />
			<IconExit v-else class="text-red-500" />
		</transition>
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
