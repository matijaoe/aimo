<template>
	<button :class="[mode, { thin: thin }]" @click="$emit('click', $event)">
		<span class="flex items-center gap-2 w-full">
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
	},
	emits: ['click'],
};
</script>

<style lang="postcss" scoped>
button {
	@apply relative border-none cursor-pointer pointer-events-auto focus:outline-none;
	@apply uppercase text-xs font-bold rounded-lg overflow-hidden;
	@apply tracking-[0.05rem];
	@apply py-3 px-7;
	@apply transition;
	@apply text-gray-700;
}

button.thin {
	@apply py-2;
}

button::before,
button::after {
	@apply absolute top-0 left-0 w-full h-full;
}

button span {
	@apply relative;
	/* mix-blend-mode: difference; */
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

.fill {
	@apply bg-gray-100;
}

.fill::before {
	@apply bg-gray-200;
}

.fill--color {
	@apply bg-amber-200 bg-opacity-70 text-amber-700;
}

.fill--color::before {
	@apply bg-amber-100;
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
