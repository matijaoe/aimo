<template>
	<nuxt-link v-if="link" :to="to">
		<button
			:class="[mode, { thin: thin, square: square }]"
			class="focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 relative border-none cursor-pointer pointer-events-auto focus:outline-none focus:border-none uppercase text-xs font-bold rounded-lg overflow-hidden tracking-[0.05rem] transition text-gray-700"
			@click="$emit('click', $event)"
		>
			<span class="flex items-center gap-2 w-full relative">
				<slot />
			</span>
		</button>
	</nuxt-link>

	<button
		v-else
		:class="[mode, { thin: thin, square: square }]"
		class="focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 relative border-none cursor-pointer pointer-events-auto focus:outline-none focus:border-none uppercase text-xs font-bold rounded-lg overflow-hidden tracking-[0.05rem] transition text-gray-700"
		@click="$emit('click', $event)"
	>
		<span class="flex items-center gap-2 w-full relative">
			<slot />
		</span>
	</button>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			required: false,
			default: null,
		},
		thin: {
			type: Boolean,
			required: false,
			default: false,
		},
		square: {
			type: Boolean,
			required: false,
			default: false,
		},
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: Object,
			required: false,
			default: () => ({}),
		},
	},
	emits: ['click'],
};
</script>

<style lang="postcss" scoped>
button {
	@apply py-3 px-7;
}

button.thin {
	@apply py-2 px-7;
}

button.square {
	@apply p-2;
}

button::before,
button::after {
	@apply absolute top-0 left-0 w-full h-full;
}

button::before {
	content: '';
	width: 130%;
	left: -12%;
	transform: skew(28deg);
	transition: transform 400ms cubic-bezier(0.3, 1, 0.8, 1);
}

button:hover::before {
	transform: translate3d(100%, 0, 0);
}

.cta {
	@apply bg-amber-200 text-amber-900;
}

.cta::before {
	@apply bg-amber-300;
}
.warn {
	@apply bg-red-400 text-white;
}

.warn::before {
	@apply bg-red-500;
}
.info {
	@apply bg-indigo-400 text-white;
}

.info::before {
	@apply bg-indigo-500;
}

.fill {
	@apply bg-gray-100;
}

.fill::before {
	@apply bg-gray-200;
}

.ghost {
	@apply border-transparent;
	@apply bg-gray-100;
}

.ghost::before {
	@apply bg-white;
}

.bland {
	@apply p-0;
	@apply bg-transparent hover:bg-transparent;
}

.bland::before {
	content: none;
}
</style>
