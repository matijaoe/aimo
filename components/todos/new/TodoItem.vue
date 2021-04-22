<template>
	<li
		class="flex items-center gap-4 px-4 py-3 border-t-2 border-gray-100 bg-white cursor-pointer transform hover:-translate-y-1 transition select-none"
		@click="toggleDone"
	>
		<div class="w-full">
			<!-- first row -->
			<div class="flex items-center gap-4">
				<!-- toggle -->
				<div
					class="w-4 h-4 border-[3px] rounded-full flex-shrink-0 border-gray-200"
					:class="{ 'bg-gray-200': isDone }"
				></div>
				<div class="flex items-center justify-between gap-2 flex-1">
					<div v-if="isDone">
						<RoughNotation :is-show="isDone" type="strike-through">
							<div :class="markDone">
								<slot></slot>
							</div>
						</RoughNotation>
					</div>
					<RoughNotation
						:is-show="isImportant && !isDone"
						type="highlight"
						color="#FDE68A"
					>
						<div v-if="!isDone">
							<slot></slot>
						</div>
					</RoughNotation>
					<div class="flex items-center gap-2">
						<div
							class="p-1 rounded-lg group"
							@click.stop="isImportant = !isImportant"
						>
							<IconStar
								class="fill-current transition"
								:class="{
									'text-amber-300': isImportant,
									'group-hover:text-amber-300': !isImportant,
									'text-gray-200': !isImportant,
								}"
								:fill="isImportant"
							/>
						</div>
						<div
							v-if="partner"
							v-tooltip.left="`@${partner.username}`"
						>
							<nuxt-link :to="`/user/${partner.username}`">
								<BaseAvatar size="sm" :src="partner.photo" />
							</nuxt-link>
						</div>
						<div v-else class="w-8 h-8"></div>
					</div>
				</div>
			</div>
			<!-- tags -->
			<div v-if="tags.length > 0" class="ml-8 space-x-2">
				<BaseTag
					v-for="tag in tags"
					:key="tag.name"
					:color="!isDone ? tag.color : ''"
					:class="{ 'opacity-40': isDone }"
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
import IconStar from 'icons/IconStar.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseAvatar,
		BaseTag,
		IconStar,
	},
	props: {
		categories: {
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
			required: true,
			default: false,
		},
		important: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	data() {
		return {
			isDone: this.completed,
			isImportant: this.important,
		};
	},
	computed: {
		markDone() {
			return { 'text-gray-300': this.isDone };
		},
		...mapGetters('users', ['getUserById']),
		...mapGetters(['getCategoryById']),
		partner() {
			return this.getUserById(this.partnerId);
		},
		tags() {
			return this.categories.map((id) => this.getCategoryById(id));
		},
	},
	methods: {
		toggleDone() {
			this.isDone = !this.isDone;
		},
	},
};
</script>
