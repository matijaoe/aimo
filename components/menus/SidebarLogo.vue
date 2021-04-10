<template>
	<NuxtLink
		class="flex items-center justify-center md:-ml-2 space-x-3 cursor-pointer relative select-none rounded-lg"
		to="/home"
	>
		<LogoIcon />
		<LogoText class="hidden md:block" />
	</NuxtLink>
</template>

<script>
import LogoIcon from 'logo/LogoIcon.vue';
import LogoText from 'logo/LogoText.vue';

export default {
	components: {
		LogoIcon,
		LogoText,
	},
};
</script>
