<template>
	<span
		v-if="!link"
		class="text-[10px] leading-3 font-semibold uppercase rounded-full px-3 py-1 inline-block select-none"
		:class="colorscheme"
	>
		<slot></slot>
	</span>
	<nuxt-link
		v-else
		class="text-[10px] leading-3 font-semibold uppercase rounded-full px-3 py-1 inline-block select-none"
		:class="colorscheme"
		:to="to"
	>
		<slot></slot>
	</nuxt-link>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'gray',
		},
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: Object,
			required: false,
			default: () => ({
				path: '/community',
			}),
		},
	},
	computed: {
		colorscheme() {
			switch (this.color) {
				case 'gray':
					return ['bg-gray-100', 'text-gray-700'];
				case 'coolGray':
					return ['bg-coolGray-100', 'text-coolGray-700'];
				case 'red':
					return ['bg-red-100', 'text-red-700'];
				case 'orange':
					return ['bg-orange-100', 'text-orange-700'];
				case 'amber':
					return ['bg-amber-100', 'text-amber-700'];
				case 'yellow':
					return ['bg-yellow-100', 'text-yellow-700'];
				case 'lime':
					return ['bg-lime-100', 'text-lime-700'];
				case 'green':
					return ['bg-green-100', 'text-green-700'];
				case 'emerald':
					return ['bg-emerald-100', 'text-emerald-700'];
				case 'teal':
					return ['bg-teal-100', 'text-teal-700'];
				case 'cyan':
					return ['bg-cyan-100', 'text-cyan-700'];
				case 'lightBlue':
					return ['bg-lightBlue-100', 'text-lightBlue-700'];
				case 'blue':
					return ['bg-blue-100', 'text-blue-700'];
				case 'indigo':
					return ['bg-indigo-100', 'text-indigo-700'];
				case 'violet':
					return ['bg-violet-100', 'text-violet-700'];
				case 'purple':
					return ['bg-purple-100', 'text-purple-700'];
				case 'fuchsia':
					return ['bg-fuchsia-100', 'text-fuchsia-700'];
				case 'pink':
					return ['bg-pink-100', 'text-pink-700'];
				case 'rose':
					return ['bg-rose-100', 'text-rose-700'];
				default:
					return ['bg-gray-100', 'text-gray-700'];
			}
		},
	},
};
</script>
