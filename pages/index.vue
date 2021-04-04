<template>
	<div class="container">
		<h1 class="text-5xl">Homepage</h1>
		<button
			v-tooltip.bottom="'You have 4 new messages.'"
			class="mt-20 bg-gray-300 rounded-md px-4 py-2 uppercase"
		>
			Click me
		</button>
	</div>
</template>

<script>
export default {};
</script>
