<template>
	<div>
		<h1 class="text-5xl">Community page</h1>
		<ul class="grid gap-2 mt-8">
			<li v-for="user in users" :key="user.username">
				<NuxtLink
					class="bg-gray-100 flex items-center gap-2 p-2 rounded-md"
					:to="`user/${user.username}`"
				>
					<img
						:src="user.image"
						alt="user-photo"
						class="w-10 h-10 rounded-full"
					/>
					<div>
						<h3 class="text-base">
							{{ user.fname + ' ' + user.lname }}
						</h3>
						<p class="text-xs flex items-center gap-1">
							<span>{{ user.age }} years old,</span>
							<span>from {{ user.country }}</span>
						</p>
					</div>
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('users', ['users']),
	},
};
</script>
