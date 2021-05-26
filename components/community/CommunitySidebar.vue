<template>
	<BaseContainer>
		<div class="space-y-8 mt-4">
			<div
				v-if="categoryId"
				class="text-center flex items-center gap-4 justify-center -ml-3"
			>
				<div
					class="w-8 h-8 rounded-full"
					:class="colorscheme(category.color)[0]"
				/>
				<h2 class="text-4xl leading-3 font-semibold uppercase">
					{{ category.name }}
				</h2>
			</div>
			<div
				v-else
				class="text-center flex items-center gap-4 justify-center -ml-3"
			>
				<div
					class="w-8 h-8 rounded-full"
					:class="colorscheme('gray')[0]"
				/>
				<h2 class="text-4xl leading-3 font-semibold uppercase">All</h2>
			</div>

			<div class="space-y-4">
				<h3 class="text-xl font-bold ml-1">Categories</h3>
				<div
					class="flex overflow-x-auto md:flex-wrap items-center gap-2"
				>
					<BaseTag link :to="{ name: 'community' }">All</BaseTag>
					<BaseTag
						v-for="cat in categories"
						:key="cat.id"
						:color="cat.color"
						link
						:to="{ path: `/community/${cat.name}` }"
					>
						{{ cat.name }}
					</BaseTag>
				</div>
			</div>

			<div class="space-y-4">
				<h3 class="text-xl font-bold ml-1">Partners</h3>
				<div
					v-if="currentUserPartners.length > 0"
					class="flex overflow-x-auto md:flex-wrap items-center gap-2"
				>
					<BaseAvatar
						v-for="user in currentUserPartners"
						:key="user.id"
						link
						:to="{ path: `/user/${user.username}` }"
						:src="user.photo"
						class="border-2 p-[3px]"
					>
						{{ user.name }}
					</BaseAvatar>
				</div>
				<div v-else>
					<BaseTag>No partners found</BaseTag>
				</div>
			</div>

			<div class="space-y-4">
				<h3 class="text-xl font-bold ml-1">Users</h3>
				<div
					v-if="users.length > 0"
					class="flex overflow-x-auto md:flex-wrap items-center gap-2"
				>
					<BaseAvatar
						v-for="user in usersWithoutUsAndPartners"
						:key="user.id"
						v-tooltip.bottom="`@${user.username}`"
						link
						:to="{ path: `/user/${user.username}` }"
						:src="user.photo"
						class="border-2 p-[3px]"
					>
						{{ user.name }}
					</BaseAvatar>
				</div>
				<div v-else>
					<BaseTag>No users found</BaseTag>
				</div>
			</div>
		</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import BaseTag from 'UI/BaseTag';
import BaseAvatar from 'UI/BaseAvatar';
import { mapGetters } from 'vuex';

export default {
	components: {
		BaseContainer,
		BaseTag,
		BaseAvatar,
	},
	props: {
		categoryId: {
			type: String,
			required: false,
			default: '',
		},
	},
	computed: {
		...mapGetters(['categories', 'currentUserPartners', 'currentUserId']),
		...mapGetters('users', ['users']),
		category() {
			if (this.categoryId) {
				return this.categories.find(
					(cat) => cat.id === this.categoryId
				);
			}
			return null;
		},
		usersWithoutUsAndPartners() {
			const filtered = this.users.filter(
				(p) => !this.currentUserPartners.includes(p)
			);
			return filtered.filter(
				(user) => user.username !== this.currentUserId
			);
		},
	},
	methods: {
		colorscheme(color) {
			switch (color) {
				case 'gray':
					return ['bg-gray-100', 'text-gray-700'];
				case 'coolGray':
					return ['bg-coolGray-100', 'text-coolGray-700'];
				case 'red':
					return ['bg-red-100', 'text-red-700'];
				case 'orange':
					return ['bg-orange-100', 'text-orange-700'];
				case 'amber':
					return ['bg-amber-100', 'text-amber-700'];
				case 'yellow':
					return ['bg-yellow-100', 'text-yellow-700'];
				case 'lime':
					return ['bg-lime-100', 'text-lime-700'];
				case 'green':
					return ['bg-green-100', 'text-green-700'];
				case 'emerald':
					return ['bg-emerald-100', 'text-emerald-700'];
				case 'teal':
					return ['bg-teal-100', 'text-teal-700'];
				case 'cyan':
					return ['bg-cyan-100', 'text-cyan-700'];
				case 'lightBlue':
					return ['bg-lightBlue-100', 'text-lightBlue-700'];
				case 'blue':
					return ['bg-blue-100', 'text-blue-700'];
				case 'indigo':
					return ['bg-indigo-100', 'text-indigo-700'];
				case 'violet':
					return ['bg-violet-100', 'text-violet-700'];
				case 'purple':
					return ['bg-purple-100', 'text-purple-700'];
				case 'fuchsia':
					return ['bg-fuchsia-100', 'text-fuchsia-700'];
				case 'pink':
					return ['bg-pink-100', 'text-pink-700'];
				case 'rose':
					return ['bg-rose-100', 'text-rose-700'];
				default:
					return ['bg-gray-100', 'text-gray-700'];
			}
		},
	},
};
</script>
