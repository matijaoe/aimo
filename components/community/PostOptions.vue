<template>
	<div class="flex items-center gap-1 text-gray-300">
		<BaseButton v-tooltip.bottom="'Like'" square class="group">
			<IconLike
				class="text-gray-300 group-hover:text-blue-500 transition"
			/>
		</BaseButton>
		<BaseButton v-tooltip.bottom="'Support'" square class="group">
			<IconDollar
				class="text-gray-300 group-hover:text-amber-500 transition"
			/>
		</BaseButton>
	</div>
</template>

<script>
import IconLike from 'icons/IconLike.vue';
import IconDollar from 'icons/IconDollar.vue';
import BaseButton from 'UI/BaseButton.vue';

export default {
	components: {
		IconLike,
		IconDollar,
		BaseButton,
	},
};
</script>
