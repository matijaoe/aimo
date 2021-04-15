<template>
	<section>
		<h1 class="text-5xl mb-10">Homepage</h1>
		<div class="flex gap-4">
			<BaseButton mode="cta">cta</BaseButton>
			<BaseButton mode="fill--color">fill--color</BaseButton>
			<BaseButton mode="fill">fill</BaseButton>
			<BaseButton mode="ghost">ghost</BaseButton>
			<BaseButton mode="bland">bland</BaseButton>
		</div>
	</section>
</template>

<script>
import BaseButton from 'UI/BaseButton.vue';

export default {
	components: {
		BaseButton,
	},
};
</script>
