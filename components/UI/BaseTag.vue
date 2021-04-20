<template>
	<span
		class="text-[10px] leading-3 font-semibold uppercase rounded-full px-3 py-1 inline-block select-none"
		:class="colorscheme"
	>
		<slot></slot>
	</span>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'gray',
		},
	},
	computed: {
		colorscheme() {
			switch (this.color) {
				case 'gray':
					return ['bg-gray-100', 'text-gray-600'];
				case 'coolGray':
					return ['bg-coolGray-100', 'text-coolGray-600'];
				case 'red':
					return ['bg-red-100', 'text-red-600'];
				case 'orange':
					return ['bg-orange-100', 'text-orange-600'];
				case 'amber':
					return ['bg-amber-100', 'text-amber-600'];
				case 'yellow':
					return ['bg-yellow-100', 'text-yellow-600'];
				case 'lime':
					return ['bg-lime-100', 'text-lime-600'];
				case 'green':
					return ['bg-green-100', 'text-green-600'];
				case 'emerald':
					return ['bg-emerald-100', 'text-emerald-600'];
				case 'teal':
					return ['bg-teal-100', 'text-teal-600'];
				case 'cyan':
					return ['bg-cyan-100', 'text-cyan-600'];
				case 'lightBlue':
					return ['bg-lightBlue-100', 'text-lightBlue-600'];
				case 'blue':
					return ['bg-blue-100', 'text-blue-600'];
				case 'indigo':
					return ['bg-indigo-100', 'text-indigo-600'];
				case 'violet':
					return ['bg-violet-100', 'text-violet-600'];
				case 'purple':
					return ['bg-purple-100', 'text-purple-600'];
				case 'fuchsia':
					return ['bg-fuchsia-100', 'text-fuchsia-600'];
				case 'pink':
					return ['bg-pink-100', 'text-pink-600'];
				case 'rose':
					return ['bg-rose-100', 'text-rose-600'];
				default:
					return ['bg-gray-100', 'text-gray-600'];
			}
		},
	},
};
</script>
