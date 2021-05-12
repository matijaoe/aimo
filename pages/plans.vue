<template>
	<div
		class="md:col-span-2 lg:col-span-3 bg-[#F4F4F4] text-[#4D61FC] rounded-2xl flex items-center pl-[10%]"
	>
		<h2 class="flex-1 space-y-10 py-20 md:py-0">
			<div
				class="text-base xs:text-xl sm:text-3xl md:text-xl lg:text-2xl xl:text-4xl font-bold"
			>
				<span v-if="!isPremium" class="text-[#4D61FC]"
					>Upgrade to premium today!</span
				>
				<span v-else class="text-[#4D61FC]"
					>Thanks for upgrading to premium!</span
				>
			</div>
		</h2>
		<div id="vector-illustration" class="flex-1 hidden md:flex">
			<img
				src="~assets/img/premium.svg"
				alt="illustration"
				class="ml-auto max-h-[350px]"
			/>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['currentUser']),
		isPremium() {
			return this.currentUser.isPremium;
		},
	},
};
</script>
