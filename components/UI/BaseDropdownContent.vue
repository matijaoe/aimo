<template>
	<transition name="dropdown">
		<BaseContainer
			v-if="active"
			class="absolute right-0 mt-3 p-0 min-w-[180px] divide-y-2 divide-gray-100 text-left text-gray-700 z-50"
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

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
	transition: all 300ms;
}
.dropdown-enter,
.dropdown-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
