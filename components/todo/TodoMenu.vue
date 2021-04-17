<template>
	<div class="flex flex-items-center gap-2 overflow-x-auto my-5">
		<BaseButton mode="ghost">Add to Favorites</BaseButton>
		<BaseButton mode="fill--color">Submit engagement</BaseButton>
		<BaseButton mode="cta">Give Coins</BaseButton>
		<BaseButton mode="ghost">Give up</BaseButton>
	</div>
</template>

<script>
import BaseButton from '../UI/BaseButton';
export default {
	components: { BaseButton },
};
</script>
