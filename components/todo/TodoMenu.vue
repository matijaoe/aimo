<template>
	<div class="flex flex-items-center gap-2 overflow-x-auto my-5">
		<BaseButton
			v-if="todo.favorite"
			mode="ghost"
			@click="toggleFavorite(false)"
			>Remove from favorites</BaseButton
		>
		<BaseButton v-else mode="ghost" @click="toggleFavorite(true)"
			>Add to Favorites</BaseButton
		>
		<BaseButton mode="fill--color">Submit engagement</BaseButton>
		<BaseButton mode="cta">Give Coins</BaseButton>
		<BaseButton mode="ghost">Give up</BaseButton>
	</div>
</template>

<script>
import BaseButton from '../UI/BaseButton';
export default {
	components: { BaseButton },
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	methods: {
		toggleFavorite(isFavorite) {
			this.$store.dispatch('todos/changeFavorite', {
				id: this.todo.id,
				favorite: isFavorite,
			});
		},
	},
};
</script>
