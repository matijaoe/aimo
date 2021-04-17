<template>
	<BaseContainer @click.native="toggleDesc">
		<header class="flex justify-between">
			<h2 class="text-lg font-bold">
				{{ title }}
				<span v-if="hasPartner">
					w/
					<NuxtLink
						:to="`/user/${partner}`"
						class="text-amber-300 hover:text-amber-400"
					>
						{{ partnerFullName }}
					</NuxtLink>
				</span>
			</h2>
			<BaseAvatar v-if="hasPartner" :src="partnerInfo.photo" />
		</header>

		<section v-if="showDesc">
			<p>{{ desc }}</p>
			<hr class="mt-4 border-coolGray-500" />
		</section>

		<footer class="flex justify-end">
			<TodoOptions :todo-id="todoId" />
		</footer>
	</BaseContainer>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseContainer from 'UI/BaseContainer';
import TodoOptions from './TodoOptions.vue';

export default {
	components: { BaseContainer, BaseAvatar, TodoOptions },
	props: {
		todoId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		partner: {
			type: String,
			required: false,
			default: 'personal',
		},
		desc: {
			type: String,
			required: false,
			default: 'No description.',
		},
	},
	data() {
		return {
			partnerPictureUrl: null,
			showDesc: false,
		};
	},
	computed: {
		...mapGetters('users', ['getUserById']),
		hasPartner() {
			return this.partner !== 'personal' && this.partner !== '';
		},
		partnerFullName() {
			return `${this.partnerInfo.fname} ${this.partnerInfo.lname}`;
		},
		partnerInfo() {
			return this.getUserById(this.partner);
		},
	},
	methods: {
		toggleDesc() {
			this.showDesc = !this.showDesc;
		},
	},
};
</script>
