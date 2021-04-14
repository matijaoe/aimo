<template>
	<li>
		<nuxt-link
			v-if="link"
			class="px-3 py-2 hover:bg-gray-50 flex items-center justify-start gap-2"
			:to="to"
		>
			<slot />
		</nuxt-link>
		<p v-else class="px-3 py-2">
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
		to: {
			type: String,
			required: false,
			default: '/',
		},
	},
};
</script>
