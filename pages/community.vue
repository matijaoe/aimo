<template>
	<div>
		<h1 class="text-5xl">Community page</h1>

		<ul class="grid grid-cols-4 gap-2 mt-8">
			<BaseContainer
				v-for="user in users"
				:key="user.username"
				class="p-1 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-100"
			>
				<NuxtLink
					class="flex items-center gap-3 p-2 rounded-md"
					:to="`user/${user.username}`"
				>
					<BaseAvatar :src="user.photo" size="lg" />
					<div class="flex flex-col justify-around">
						<h3 class="text-lg">
							{{ user.fname + ' ' + user.lname }}
						</h3>
						<p class="opacity-40 text-xs">@{{ user.username }}</p>
					</div>
				</NuxtLink>
			</BaseContainer>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseContainer from 'UI/BaseContainer.vue';

export default {
	components: {
		BaseAvatar,
		BaseContainer,
	},
	computed: {
		...mapGetters('users', ['users']),
	},
};
</script>
