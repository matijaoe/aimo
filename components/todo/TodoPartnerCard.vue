<template>
	<BaseContainer fieldset label="partner" class="flex items-center">
		<header>
			<NuxtLink
				v-if="partner"
				:to="partnerProfileLink"
				class="text-amber-400 flex gap-5 items-center"
			>
				{{ partnerFullName }}
				<BaseAvatar :src="partner.photo" no-ring />
			</NuxtLink>
			<p v-else>This is your personal todo.</p>
		</header>
	</BaseContainer>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar';
import BaseContainer from 'UI/BaseContainer';
export default {
	components: { BaseContainer, BaseAvatar },
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
