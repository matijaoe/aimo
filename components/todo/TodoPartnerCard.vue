<template>
	<div class="flex items-center ml-8 gap-2">
		<p v-if="partner">Partnered with</p>
		<NuxtLink
			v-if="partner"
			:to="partnerProfileLink"
			class="group flex gap-5 items-center hover:bg-amber-50 transition ease-in-out py-2 px-6 rounded-lg transform hover:-rotate-12 hover:scale-125 z-10 border-2 border-transparent hover:border-amber-200"
		>
			<BaseAvatar :src="partner.photo" />
			<div
				class="flex flex-col justify-around group-hover:text-amber-800"
			>
				<span>{{ partnerFullName }}</span>
				<span class="text-xs text-gray-400 group-hover:text-amber-400"
					>@{{ partner.username }}</span
				>
			</div>
		</NuxtLink>
		<p v-else>You have no partners for this todo 😳</p>
	</div>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar';
export default {
	components: { BaseAvatar },
	props: {
		partner: {
			type: Object,
			required: false,
		},
	},
	computed: {
		partnerProfileLink() {
			return `/user/${this.partner.username}`;
		},
		partnerFullName() {
			return `${this.partner.fname} ${this.partner.lname}`;
		},
	},
};
</script>
