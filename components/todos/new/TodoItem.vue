<template>
	<li
		class="flex items-center gap-4 px-4 py-3 border-t-2 border-gray-100 bg-white cursor-pointer transform hover:-translate-y-1 transition"
		@click="toggleDone"
	>
		<div class="w-full">
			<!-- first row -->
			<div class="flex items-center gap-4">
				<!-- toggle -->
				<div
					class="w-4 h-4 border-[3px] rounded-full flex-shrink-0 border-gray-200"
					:class="{ 'bg-gray-200': done }"
				></div>
				<div class="flex items-center justify-between gap-2 flex-1">
					<RoughNotation :is-show="done" type="strike-through">
						<div :class="markDone">
							<slot></slot>
						</div>
					</RoughNotation>
					<div v-if="partner" v-tooltip.left="`@${partner.username}`">
						<BaseAvatar size="sm" :src="partner.photo" />
					</div>
					<div v-else class="w-7 h-7"></div>
				</div>
			</div>
			<!-- tags -->
			<div v-if="tags.length > 0" class="ml-8 space-x-2">
				<BaseTag
					v-for="tag in tags"
					:key="tag.name"
					:color="!done ? tag.color : ''"
					:class="{ 'opacity-40': done }"
				>
					{{ tag.name }}
				</BaseTag>
			</div>
		</div>
	</li>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseTag from 'UI/BaseTag.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseAvatar,
		BaseTag,
	},
	props: {
		tags: {
			type: Array,
			required: false,
			default: () => [],
		},
		partnerId: {
			type: String,
			required: false,
			default: null,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			done: this.completed,
		};
	},
	computed: {
		markDone() {
			return { 'text-gray-300': this.done };
		},
		...mapGetters('users', ['getUserById']),
		partner() {
			console.log(this.partnerId);
			const partner = this.getUserById(this.partnerId);
			console.log(partner);
			return partner;
		},
	},
	methods: {
		toggleDone() {
			this.done = !this.done;
		},
	},
};
</script>
