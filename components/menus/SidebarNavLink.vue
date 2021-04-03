<template>
	<NuxtLink
		:to="to"
		class="flex items-center justify-center md:justify-start px-2 md:px-4 py-2 space-x-4 text-base rounded-lg hover:bg-gray-100"
	>
		<slot></slot>
		<span class="hidden md:block">{{ text }}</span>
	</NuxtLink>
</template>

<script>
export default {
	props: ['text', 'to'],
};
</script>
