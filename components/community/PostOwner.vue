<template>
	<NuxtLink class="flex items-center gap-2" :to="`/user/${user.username}`">
		<BaseAvatar :src="user.photo" size="sm" />
		<div class="flex flex-col justify-around text-xs">
			<p>
				{{ fullName }}
			</p>
			<p class="text-xs text-gray-300">@{{ user.username }}</p>
		</div>
	</NuxtLink>
</template>

<script>
import BaseAvatar from '../UI/BaseAvatar';
export default {
	components: { BaseAvatar },
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	computed: {
		fullName() {
			return `${this.user.fname} ${this.user.lname}`;
		},
	},
};
</script>
