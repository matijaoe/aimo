<template>
	<BaseContainer fieldset label="Socials">
		<div class="grid grid-cols-7 gap-2">
			<BaseBrandIcon
				v-for="social in user.socials"
				:key="social"
				:brand="social"
				href="#"
			/>
		</div>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseBrandIcon from 'UI/BaseBrandIcon.vue';

export default {
	components: { BaseContainer, BaseBrandIcon },
	props: ['user'],
};
</script>
