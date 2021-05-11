<template>
	<div class="flex items-center" :class="small ? 'gap-2' : 'gap-4'">
		<IconStar
			v-tooltip.bottom="'Important'"
			class="fill-current transition"
			:class="starStyle"
			:fill="isImportant"
		/>
		<IconGlobeAlt
			v-tooltip.bottom="'Repeats daily'"
			class="transition"
			:class="isDaily ? 'text-blue-400' : 'text-gray-300'"
		/>
		<IconCheckCircle
			v-tooltip.bottom="'Completed'"
			class="transition"
			:class="isCompleted ? 'text-indigo-400' : 'text-gray-300'"
		/>
		<IconShieldCheck
			v-tooltip.bottom="'Approved'"
			class="transition"
			:class="isApproved ? 'text-emerald-400' : 'text-gray-300'"
		/>
		<div
			v-if="!isPersonal && partner"
			v-tooltip.bottom="`@${partner.username}`"
		>
			<nuxt-link :to="`/user/${partner.username}`">
				<BaseAvatar size="xs" :src="partner.photo" />
			</nuxt-link>
		</div>
		<div
			v-else
			v-tooltip.bottom="'Personal'"
			class="flex items-center justify-center"
		>
			<IconUserCircle class="text-gray-300" />
		</div>
	</div>
</template>

<script>
import IconStar from 'icons/IconStar';
import IconGlobeAlt from 'icons/IconGlobeAlt';
import IconCheckCircle from 'icons/IconCheckCircle';
import IconShieldCheck from 'icons/IconShieldCheck';
import IconUserCircle from 'icons/IconUserCircle';
import BaseAvatar from 'UI/BaseAvatar';
export default {
	components: {
		IconStar,
		IconShieldCheck,
		IconGlobeAlt,
		IconCheckCircle,
		IconUserCircle,
		BaseAvatar,
	},
	props: {
		small: {
			type: Boolean,
			required: false,
			default: false,
		},
		isImportant: {
			type: Boolean,
			required: false,
			default: false,
		},
		isDaily: {
			type: Boolean,
			required: false,
			default: false,
		},
		isCompleted: {
			type: Boolean,
			required: false,
			default: false,
		},
		isApproved: {
			type: Boolean,
			required: false,
			default: false,
		},
		isPersonal: {
			type: Boolean,
			required: false,
			default: false,
		},
		partner: {
			type: Object,
			required: false,
			default: null,
		},
	},
	computed: {
		starStyle() {
			if (this.isImportant) {
				return ['text-amber-300'];
			} else {
				return ['text-gray-200', 'group-hover:text-amber-300'];
			}
		},
	},
};
</script>
