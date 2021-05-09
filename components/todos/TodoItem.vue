<template>
	<li
		class="flex items-center gap-4 px-4 py-3 border-t-2 cursor-pointer transform hover:-translate-y-1 transition select-none bg-white border-gray-100"
		@click="toggleDone"
	>
		<div class="w-full">
			<!-- first row -->
			<div class="flex items-center gap-4">
				<!-- toggle -->
				<div
					class="w-4 h-4 border-[3px] rounded-full flex-shrink-0"
					:class="dotColor"
				/>
				<div
					class="flex items-center justify-between gap-2 flex-1"
					@click.stop="emitTodoEdit"
				>
					<div v-if="completed">
						<RoughNotation
							:is-show="completed"
							type="strike-through"
						>
							<div :class="markDone">
								<slot />
							</div>
						</RoughNotation>
					</div>

					<RoughNotation
						:is-show="important && !completed"
						type="highlight"
						color="#FDE68A"
					>
						<div v-if="!completed">
							<slot />
						</div>
					</RoughNotation>
					<div class="flex items-center gap-2">
						<div
							v-if="daily"
							v-tooltip.left="'Repeats daily'"
							class="p-1 rounded-lg"
						>
							<IconGlobeAlt class="text-blue-400" />
						</div>
						<div
							v-if="isApproved"
							v-tooltip.left="'Approved'"
							class="p-1 rounded-lg"
						>
							<IconShieldCheck class="text-emerald-400" />
						</div>
						<div
							v-tooltip.left="
								important ? 'Important' : 'Mark as important'
							"
							class="p-1 rounded-lg group"
							@click.stop="toggleImportant"
						>
							<IconStar
								class="fill-current transition"
								:class="starStyle"
								:fill="important"
							/>
						</div>
						<div
							v-if="partner"
							v-tooltip.left="`@${partner.username}`"
							@click.stop=""
						>
							<nuxt-link :to="`/user/${partner.username}`">
								<BaseAvatar size="sm" :src="partner.photo" />
							</nuxt-link>
						</div>
						<div
							v-else
							v-tooltip.left="'Personal'"
							class="flex items-center justify-center"
						>
							<IconUserCircle size="lg" class="text-gray-300" />
						</div>
					</div>
				</div>
			</div>

			<!-- tags -->
			<div v-if="tags.length > 0" class="ml-8 space-x-2" @click.stop="">
				<BaseTag
					v-for="tag in tags"
					:key="tag.name"
					:color="!completed ? tag.color : ''"
					:class="{ 'opacity-40': completed }"
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
import IconUserCircle from 'icons/IconUserCircle.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
	components: {
		BaseAvatar,
		BaseTag,
		IconStar,
		IconGlobeAlt,
		IconShieldCheck,
		IconUserCircle,
	},
	props: {
		// todo currently not really used
		todo: {
			type: Object,
			required: false,
			default: () => {},
		},
		id: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
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
		approved: {
			type: Boolean,
			required: false,
			default: false,
		},
		important: {
			type: Boolean,
			required: true,
			default: false,
		},
		daily: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	emits: ['edit'],
	data() {
		return {
			isDone: this.completed,
			isImportant: this.important,
			isApproved: this.approved,
		};
	},
	computed: {
		markDone() {
			return { 'text-gray-300': this.completed };
		},
		...mapGetters('users', ['getUserById']),
		...mapGetters(['getCategoryById']),
		partner() {
			return this.getUserById(this.partnerId);
		},
		tags() {
			return this.categories.map((id) => this.getCategoryById(id));
		},
		dotColor() {
			if (this.isApproved) {
				return ['bg-emerald-400', 'border-emerald-400'];
			} else if (this.completed) {
				return ['bg-gray-200', 'border-gray-200'];
			} else {
				return ['border-gray-200'];
			}
		},
		starStyle() {
			if (this.important) {
				return ['text-amber-300'];
			} else {
				return ['text-gray-200', 'group-hover:text-amber-300'];
			}
		},
	},
	methods: {
		...mapActions('todos', ['updateTodo']),
		toggleDone() {
			if (!this.isApproved) {
				this.isDone = !this.isDone;
				this.updateTodo({
					...this.todo,
					id: this.id,
					done: this.isDone,
				});
			}
		},
		toggleImportant() {
			this.isImportant = !this.isImportant;
			this.updateTodo({
				...this.todo,
				id: this.id,
				important: this.isImportant,
			});
		},
		emitTodoEdit() {
			this.$emit('edit', this.id);
		},
	},
};
</script>
