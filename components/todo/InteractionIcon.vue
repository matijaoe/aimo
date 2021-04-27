<template>
	<div
		class="flex p-3 justify-center items-center bg-amber-100 rounded-3xl"
		:class="circleStyle"
	>
		<IconPlus v-if="type === 'created'" :class="iconColor" />
		<IconCheck v-else-if="type === 'approved'" :class="iconColor" />
		<IconInfo v-else-if="type === 'review'" :class="iconColor" />
		<IconFire v-else :class="iconColor" />
	</div>
</template>

<script>
import IconCheck from 'icons/IconCheck';
import IconFire from 'icons/IconFire';
import IconInfo from 'icons/IconInfo';
import IconPlus from 'icons/IconPlus';
export default {
	components: { IconPlus, IconInfo, IconFire, IconCheck },
	props: {
		type: {
			type: String,
			required: false,
			default: 'engagement',
		},
	},
	computed: {
		circleStyle() {
			if (this.type === 'created') {
				return 'bg-coolGray-600';
			} else if (this.type === 'approved') {
				return 'bg-green-500';
			} else if (this.type === 'review') {
				return 'bg-red-500';
			}
			return 'bg-blue-500';
		},
		iconColor() {
			return 'text-amber-50';
		},
	},
};
</script>
