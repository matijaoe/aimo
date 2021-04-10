<template>
	<section>
		<h1 class="text-5xl mb-10">Homepage</h1>
		<div class="flex gap-4">
			<BaseButton mode="cta">Add</BaseButton>
			<BaseButton mode="fill--color">Update</BaseButton>
			<BaseButton mode="fill">Undo</BaseButton>
			<BaseButton mode="ghost">Edit</BaseButton>
		</div>

		<div class="grid grid-cols-2 gap-4 mt-8 max-w-6xl mx-auto">
			<BaseContainer>
				<p>Primjer kartice</p>
			</BaseContainer>
			<BaseContainer>textic</BaseContainer>
			<BaseContainer>textic</BaseContainer>
		</div>
	</section>
</template>

<script>
import BaseButton from 'UI/BaseButton.vue';
import BaseContainer from 'UI/BaseContainer.vue';

export default {
	components: {
		BaseButton,
		BaseContainer,
	},
};
</script>
