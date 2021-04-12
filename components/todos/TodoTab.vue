<template>
	<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
		<a
			class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal hover:cursor-pointer"
			:class="{
				'text-amber-300 bg-white': openedTab !== tabId,
				'text-white bg-amber-400': openedTab === tabId,
			}"
			@click="$emit('toggle-tabs', tabId)"
		>
			{{ label }}
		</a>
	</li>
</template>

<script>
export default {
	props: {
		tabId: {
			type: String,
			required: true,
		},
		openedTab: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: false,
			default: 'Tab',
		},
	},
	emits: ['toggle-tabs'],
};
</script>
