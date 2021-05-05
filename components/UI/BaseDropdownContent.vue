<template>
	<transition name="fade-in-up">
		<BaseContainer
			v-if="active"
			class="absolute top-full right-0 mt-2 divide-y-2 divide-gray-100 text-left text-gray-700 z-50 min-w-[180px] overflow-auto customHeight"
			no-padding
		>
			<slot />
		</BaseContainer>
	</transition>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';

export default {
	components: {
		BaseContainer,
	},
	inject: ['sharedState'],
	computed: {
		active() {
			return this.sharedState.active;
		},
	},
};
</script>

<style scoped lang="postcss">
.customHeight {
	/* height: clamp(100px, 800px, 500px); */
	max-height: 500px;
}
</style>
