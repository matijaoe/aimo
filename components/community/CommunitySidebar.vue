<template>
	<BaseContainer>
		<div class="space-y-8">
			<h2 v-if="category" class="text-3xl font-bold py-2 text-center">
				{{ category.name }}
			</h2>

			<div class="space-y-4">
				<h3 class="text-xl font-bold ml-1">Categories</h3>
				<div class="flex flex-wrap items-center gap-2">
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
				<div class="flex flex-wrap items-center gap-2">
					<BaseAvatar
						v-for="user in currentUserPartners"
						:key="user.id"
						v-tooltip.bottom="user.username"
						link
						:to="{ path: `/user/${user.username}` }"
						:src="user.photo"
					>
						{{ user.name }}
					</BaseAvatar>
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
	category: {
		type: Object,
		required: false,
		default: null,
	},
	components: {
		BaseContainer,
		BaseTag,
		BaseAvatar,
	},
	computed: {
		...mapGetters(['categories', 'currentUserPartners']),
	},
};
</script>
