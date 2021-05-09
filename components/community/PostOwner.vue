<template>
	<NuxtLink
		class="flex items-center gap-3 p-2 rounded-md"
		:to="`/user/${user.username}`"
	>
		<BaseAvatar :src="user.photo" size="sm" />
		<div class="flex flex-col justify-around">
			<h3 class="text-lg" :class="hoverEffect">
				{{ user.fname + ' ' + user.lname }}
			</h3>
			<p class="opacity-40 text-xs" :class="hoverEffect">
				@{{ user.username }}
			</p>
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
		hoverEffect() {
			return 'hover:text-indigo-700 hover:border-indigo-100';
		},
	},
};
</script>
