<template>
	<div class="my-2 flex justify-between">
		<NuxtLink
			:to="`/todo/${todoId}`"
			class="hover:text-blue-400"
			:class="optionStyle"
		>
			<IconInfo />
		</NuxtLink>
		<NuxtLink to="/home" class="hover:text-amber-400" :class="optionStyle">
			<IconPencil />
		</NuxtLink>
		<NuxtLink
			to="/home"
			class="hover:text-emerald-500"
			:class="optionStyle"
		>
			<IconCheck />
		</NuxtLink>
	</div>
</template>

<script>
import IconInfo from 'icons/IconInfo';
import IconPencil from 'icons/IconPencil';
import IconCheck from 'icons/IconCheck';
export default {
	components: { IconCheck, IconPencil, IconInfo },
	props: {
		todoId: {
			type: String,
			required: true,
		},
	},
	computed: {
		optionStyle() {
			return 'mx-1.5';
		},
	},
};
</script>
