<template>
	<BaseContainer fieldset label="Notifications">
		<p class="px-5 font-medium" :class="{ 'mb-3': notifyCount > 0 }">
			You have
			<span
				v-if="notifyCount"
				class="font-bold mx-1 text-amber-500 text-base transition p-2 bg-amber-100 w-9 h-9 inline-grid rounded-full place-content-center"
			>
				{{ notifyCount }}
			</span>
			<span v-else>no</span>
			new notification{{ notifyCount === 1 ? '' : 's' }}
		</p>
		<ul class="space-y-2">
			<li
				v-for="notification in user.notifications"
				:key="notification"
				class="py-3 px-5 bg-gray-50 rounded-lg"
			>
				{{ notification }}
			</li>
		</ul>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';

export default {
	components: { BaseContainer },
	props: ['user'],
	computed: {
		notifyCount() {
			return this.user.notifications?.length || 0;
		},
	},
};
</script>
