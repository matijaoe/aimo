<template>
	<div
		v-if="
			((results.categories && results.categories.length > 0) ||
				(results.users && results.users.length > 0)) &&
			active
		"
		id="headerSearchDropdown"
		class="relative inline-block w-full mb-2 z-50"
		@click="changeState"
	>
		<ul class="bg-white absolute top-full text-gray-700 w-full border-2">
			<p class="text-xs uppercase text-gray-500 select-none ml-1 mt-1">
				Users
			</p>
			<li
				v-for="user in results.users"
				:key="user.id"
				class="w-full hover:bg-gray-50 hover:text-gray-700"
				@click="clearInput"
			>
				<nuxt-link :to="{ path: `/user/${user.id}` }">
					<div class="flex items-start gap-4 group p-2">
						<div
							class="w-full text-gray-500 group-hover:text-gray-700 px-2"
						>
							<BaseAvatar :src="user.photo" class="float-left">
							</BaseAvatar>
							<div
								class="text-base text-right text-gray-600 font-semibold text-[14px]"
							>
								<span class="mr-[1px]">@</span>{{ user.id }}
							</div>
							<div class="uppercase text-right">
								{{ user.fname }} {{ user.lname }}
							</div>
						</div>
					</div>
				</nuxt-link>
			</li>
			<div style="border-top: 2px solid #e2e8f0">
				<p
					class="text-xs uppercase text-gray-500 select-none ml-1 mt-1"
				>
					Categories
				</p>
				<div
					class="flex justify-between flex-col my-2 mx-2"
					@click="clearInput"
				>
					<BaseTag
						v-for="cat in results.categories"
						id="searchBaseTag"
						:key="cat.id"
						:color="cat.color"
						class="text-center pt-[10px] pb-[10px] m-[4px]"
						link
						:to="{ path: `/community/${cat.name}` }"
					>
						{{ cat.name }}
					</BaseTag>
				</div>
			</div>
		</ul>
	</div>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar';
import BaseTag from 'UI/BaseTag';
import { mapActions } from 'vuex';
export default {
	components: {
		BaseAvatar,
		BaseTag,
	},
	inject: ['sharedState'],
	props: ['results'],
	computed: {
		active() {
			return this.sharedState.active;
		},
	},
	methods: {
		...mapActions(['clearSearchResults']),
		changeState() {
			this.sharedState.active = !this.sharedState.active;
		},
		clearInput() {
			document.getElementById('searchbar').value = '';
			document.getElementById('headerSearchDropdown').style.display =
				'none';
			this.clearSearchResults();
		},
	},
};
</script>
