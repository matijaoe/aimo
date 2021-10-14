<template>
	<li
		class="
			flex
			items-center
			gap-4
			px-4
			py-3
			border-t-2
			cursor-pointer
			transform
			hover:-translate-y-1
			transition
			select-none
		"
		:class="itemBg"
		@click="openReview(review.id)"
	>
		<div class="w-full">
			<!-- first row -->
			<div class="flex items-center gap-4">
				<!-- toggle -->
				<div
					class="w-4 h-4 border-[3px] rounded-full flex-shrink-0"
					:class="dotColor"
				></div>
				<div class="flex items-center justify-between gap-2 flex-1">
					<div v-if="review.done">
						<RoughNotation
							:is-show="review.done"
							type="strike-through"
							:color="stateColor"
						>
							<div :class="markDone">
								<slot></slot>
							</div>
						</RoughNotation>
					</div>

					<RoughNotation
						:is-show="review.important && !review.done"
						type="highlight"
						color="#FDE68A"
					>
						<div v-if="!review.done">
							<slot></slot>
						</div>
					</RoughNotation>
					<div class="flex items-center gap-2">
						<div
							v-if="review.daily"
							v-tooltip.left="'Repeats daily'"
							class="p-1 rounded-lg"
						>
							<IconGlobeAlt class="text-blue-400" />
						</div>
						<div
							v-if="review.approved"
							v-tooltip.left="'Approved'"
							class="p-1 rounded-lg"
						>
							<IconShieldCheck class="text-emerald-400" />
						</div>
						<div
							v-tooltip.left="
								review.important
									? 'Important'
									: 'Mark as important'
							"
							class="p-1 rounded-lg group"
						>
							<IconStar
								class="fill-current transition"
								:class="starStyle"
								:fill="review.important"
							/>
						</div>
						<div
							v-tooltip.left="`@${partner.username}`"
							@click.stop=""
						>
							<nuxt-link :to="`/user/${partner.username}`">
								<BaseAvatar size="sm" :src="partner.photo" />
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
			<!-- tags -->
			<div v-if="tags.length > 0" class="ml-8 space-x-2" @click.stop="">
				<BaseTag
					v-for="tag in tags"
					:key="tag.name"
					:color="!review.done ? tag.color : ''"
					:class="{ 'opacity-40': review.done }"
					link
					:to="{ path: `/community/${tag.name}` }"
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
import IconGlobeAlt from 'icons/IconGlobeAlt.vue';
import IconShieldCheck from 'icons/IconShieldCheck.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseAvatar,
		BaseTag,
		IconStar,
		IconGlobeAlt,
		IconShieldCheck,
	},
	inject: ['openReview'],
	props: {
		review: {
			type: Object,
			required: true,
		},
	},
	computed: {
		markDone() {
			return { 'text-gray-300': this.review.done };
		},
		...mapGetters('users', ['getUserById']),
		...mapGetters(['getCategoryById']),
		partner() {
			return this.getUserById(this.review.owner);
		},
		tags() {
			return this.review.categories.map((id) => this.getCategoryById(id));
		},
		stateColor() {
			return 'currentColor';
		},
		dotColor() {
			if (this.review.approved) {
				return ['bg-emerald-400', 'border-emerald-400'];
			} else if (this.review.done) {
				return ['bg-gray-200', 'border-gray-200'];
			} else {
				return ['border-gray-200'];
			}
		},
		itemBg() {
			return ['bg-white', 'border-gray-100'];
		},
		starStyle() {
			return this.review.important
				? ['text-amber-300']
				: ['text-gray-200', 'group-hover:text-amber-300'];
		},
	},
};
</script>
