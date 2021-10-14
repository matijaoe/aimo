<template>
	<li @click="$emit('click', $event)">
		<nuxt-link
			v-if="link"
			class="
				px-3
				py-2
				text-gray-600
				hover:bg-gray-50 hover:text-gray-700
				flex
				items-center
				gap-2
				text-left
			"
			:to="to"
		>
			<slot />
		</nuxt-link>
		<button
			v-else-if="option"
			class="
				px-3
				py-2
				text-gray-600
				hover:bg-gray-50 hover:text-gray-700
				flex
				items-center
				gap-2
				text-left
				w-full
			"
			:to="to"
		>
			<slot />
		</button>
		<p v-else class="px-3 py-1">
			<slot />
		</p>
	</li>
</template>

<script>
export default {
	props: {
		link: {
			type: Boolean,
			required: false,
		},
		option: {
			type: Boolean,
			required: false,
		},
		to: {
			type: String,
			required: false,
			default: '/',
		},
	},
	emits: ['click'],
};
</script>
