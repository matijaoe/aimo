<template>
	<div
		v-click-outside="away"
		class="inline-flex items-center relative"
		@click="toggle"
	>
		<slot name="toggler">
			<button
				class="block focus:outline-none rounded-full focus-within:ring-2 ring-amber-200 ring-offset-2 p-0.25"
			>
				Toggle
			</button>
		</slot>
		<slot />
	</div>
</template>

<script>
import vClickOutside from 'v-click-outside';

export default {
	directives: {
		clickOutside: vClickOutside.directive,
	},
	provide() {
		return {
			sharedState: this.sharedState,
		};
	},
	data() {
		return {
			sharedState: {
				active: true,
			},
		};
	},
	methods: {
		toggle() {
			this.sharedState.active = !this.sharedState.active;
		},
		away() {
			this.sharedState.active = false;
		},
	},
};
</script>
