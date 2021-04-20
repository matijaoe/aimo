<template>
	<div
		class="flex items-center gap-4 px-4 py-3 border-t-2 border-gray-100 bg-white cursor-pointer transform hover:-translate-y-1 transition"
		@click="toggleDone"
	>
		<div
			class="w-4 h-4 border-[3px] rounded-full flex-shrink-0"
			:class="[borderColor, bgColor]"
		></div>
		<div class="flex items-center justify-between flex-1">
			<RoughNotation :is-show="done" type="strike-through">
				<div :class="markDone">
					<slot></slot>
				</div>
			</RoughNotation>
			<div v-tooltip.left="'username'">
				<BaseAvatar size="sm" />
			</div>
		</div>
	</div>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar.vue';

export default {
	components: {
		BaseAvatar,
	},
	props: {
		color: {
			type: String,
			required: false,
			default: '',
		},
		partner: {
			type: Object,
			required: false,
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
		borderColor() {
			if (this.color === 'blue') {
				return ['border-blue-400'];
			} else if (this.color === 'red') {
				return ['border-red-400'];
			} else if (this.color === 'emerald') {
				return ['border-emerald-400'];
			} else if (this.color === 'green') {
				return ['border-green-400'];
			} else if (this.color === 'teal') {
				return ['border-teal-400'];
			} else if (this.color === 'red') {
				return ['border-red-400'];
			} else if (this.color === 'purple') {
				return ['border-purple-400'];
			} else if (this.color === 'amber') {
				return ['border-amber-400'];
			} else if (this.color === 'orange') {
				return ['border-orange-400'];
			} else if (this.color === 'yellow') {
				return ['border-yellow-400'];
			} else {
				return ['border-gray-300'];
			}
		},
		bgColor() {
			if (this.done) {
				if (this.color === 'blue') {
					return ['bg-blue-400'];
				} else if (this.color === 'red') {
					return ['bg-red-400'];
				} else if (this.color === 'emerald') {
					return ['bg-emerald-400'];
				} else if (this.color === 'green') {
					return ['bg-green-400'];
				} else if (this.color === 'teal') {
					return ['bg-teal-400'];
				} else if (this.color === 'red') {
					return ['bg-red-400'];
				} else if (this.color === 'purple') {
					return ['bg-purple-400'];
				} else if (this.color === 'amber') {
					return ['bg-amber-400'];
				} else if (this.color === 'orange') {
					return ['bg-orange-400'];
				} else if (this.color === 'yellow') {
					return ['bg-yellow-400'];
				} else {
					return ['bg-gray-300'];
				}
			} else {
				return ['bg-transparent'];
			}
		},
		markDone() {
			if (this.done) {
				return ['text-gray-300'];
			} else {
				return [];
			}
		},
	},
	methods: {
		toggleDone() {
			this.done = !this.done;
		},
	},
};
</script>
