<template>
	<BaseContainer
		fieldset
		label="Coins"
		class="bg-amber-100 text-amber-500 border-amber-400"
	>
		<p class="font-bold font-lg">
			<span class="font-extrabold text-5xl">
				{{ user.coins }}
			</span>
			<span class="transform -rotate-6 -translate-y-3 inline-block">
				coineroos
			</span>
			<span
				class="font-lg transform rotate-6 -translate-y-3 inline-block"
			>
				earned
			</span>
			<span
				class="font-lg transform -rotate-6 -translate-y-3 inline-block"
			>
				this
			</span>
			<span
				class="font-lg transform rotate-6 -translate-y-3 inline-block"
			>
				past
			</span>
			<span
				class="font-lg transform -rotate-6 -translate-y-3 inline-block"
			>
				month
			</span>
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
