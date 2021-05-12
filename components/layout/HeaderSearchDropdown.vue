<template>
	<div
		v-if="results.users && results.users.length > 0 && active"
		id="headerSearchDropdown"
		class="relative inline-block w-full z-50"
		@click="changeState"
	>
		<BaseContainer class="absolute top-full w-full" no-padding>
			<ul class="p-2">
				<li
					v-for="user in results.users"
					:key="user.id"
					class="w-full hover:bg-gray-50 hover:text-gray-700 rounded-lg"
					@click="clearInput"
				>
					<nuxt-link :to="{ path: `/user/${user.id}` }">
						<div class="flex items-start gap-4 group p-2">
							<div
								class="w-full text-gray-500 group-hover:text-gray-700 px-2"
							>
								<BaseAvatar
									:src="user.photo"
									class="float-left"
								>
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
			</ul>
			<div>
				<div
					class="flex justify-between flex-col p-2"
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
		</BaseContainer>
	</div>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar';
import BaseTag from 'UI/BaseTag';
import BaseContainer from 'UI/BaseContainer';

import { mapActions } from 'vuex';
export default {
	components: {
		BaseAvatar,
		BaseTag,
		BaseContainer,
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
