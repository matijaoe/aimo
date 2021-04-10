<template>
	<section>
		<h1 class="text-5xl mb-10">Homepage</h1>
		<div class="flex gap-4">
			<BaseButton mode="cta">Add</BaseButton>
			<BaseButton mode="fill--color">Update</BaseButton>
			<BaseButton mode="fill">Undo</BaseButton>
			<BaseButton mode="ghost">Edit</BaseButton>
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
