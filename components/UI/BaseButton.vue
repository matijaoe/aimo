<template>
	<button :class="mode">
		<span>
			<slot></slot>
		</span>
	</button>
</template>
Ł

<script>
export default {
	props: {
		mode: {
			type: String,
			required: false,
			default: null,
		},
	},
};
</script>

<style lang="postcss" scoped>
button {
	@apply relative inline-block border-none cursor-pointer pointer-events-auto focus:outline-none;
	@apply uppercase text-sm font-bold rounded-lg overflow-hidden;
	@apply tracking-[0.05rem];
	@apply py-4 px-9;
	@apply focus:ring-2 ring-teal-200;
	@apply transition;
	@apply text-gray-700;
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
	@apply bg-teal-200 text-teal-900;
}

.cta::before {
	@apply bg-teal-300;
}

.fill {
	@apply bg-gray-100;
}

.fill::before {
	@apply bg-gray-200;
}

.fill--color {
	@apply bg-teal-200 bg-opacity-70 text-teal-700;
}

.fill--color::before {
	@apply bg-teal-100;
}

.ghost {
	@apply bg-gray-100;
}

.ghost::before {
	@apply bg-white;
}

.ghost::before {
	content: none;
}

.bland {
	@apply p-0;
	@apply bg-transparent hover:bg-transparent;
}
</style>
