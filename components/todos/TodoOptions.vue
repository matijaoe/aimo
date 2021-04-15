<template>
	<div class="my-2 flex justify-between">
		<NuxtLink to="/home" class="hover:text-blue-400" :class="optionStyle"
			><BaseIcon><IconInfo /></BaseIcon
		></NuxtLink>
		<NuxtLink to="/home" class="hover:text-amber-400" :class="optionStyle"
			><BaseIcon><IconPencil /></BaseIcon
		></NuxtLink>
		<NuxtLink to="/home" class="hover:text-emerald-500" :class="optionStyle"
			><BaseIcon><IconCheck /></BaseIcon
		></NuxtLink>
	</div>
</template>

<script>
import BaseIcon from '../UI/BaseIcon';
import IconInfo from '../app_icons/IconInfo';
import IconPencil from '../app_icons/IconPencil';
import IconCheck from '../app_icons/IconCheck';
export default {
	components: { IconCheck, IconPencil, IconInfo, BaseIcon },
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
