<template>
	<div
		v-if="results.users && results.users.length > 0 && active"
		class="relative inline-block w-full mb-2 rounded-lg"
	>
		<ul
			class="absolute bg-gray-100 top-full divide-gray-100 text-gray-700 z-50 w-full border-2 rounded-lg"
		>
			<li
				v-for="user in results.users"
				:key="user.id"
				class="bg-white w-full hover:bg-gray-50 hover:text-gray-700 rounded-lg"
			>
				<nuxt-link :to="{ path: `/user/${user.id}` }">
					<div class="flex items-start gap-4 group p-2">
						<div
							class="w-full text-gray-500 group-hover:text-gray-700 p-1 pl-2"
						>
							<IconUser
								class="opacity-75 group-hover:opacity-100 float-left mt-2 fill-current text-emerald-600"
							/>
							<div class="text-right font-bold text-base">
								{{ user.id }}
							</div>
							<div class="uppercase text-right">
								{{ user.fname }} {{ user.lname }}
							</div>
						</div>
					</div>
				</nuxt-link>
			</li>
		</ul>
	</div>
</template>

<script>
import IconUser from 'icons/IconUser.vue';
export default {
	components: {
		IconUser,
	},
	inject: ['sharedState'],
	props: ['results'],
	computed: {
		active() {
			return this.sharedState.active;
		},
	},
};
</script>
