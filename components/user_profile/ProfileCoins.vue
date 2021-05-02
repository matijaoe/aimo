<template>
	<BaseContainer
		fieldset
		label="Coins"
		class="text-amber-500 border-amber-400"
		colored
	>
		<p class="font-bold font-lg">
			<span class="font-extrabold text-4xl">{{ user.fname }}</span>
			has
			<span class="font-extrabold text-4xl">
				{{ user.coins }}
			</span>
			coins
		</p>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';

export default {
	components: { BaseContainer },
	props: ['user'],
};
</script>
