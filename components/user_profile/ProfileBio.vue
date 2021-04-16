<template>
	<BaseContainer fieldset label="Bio">
		<p>{{ user.bio }}</p>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';

export default {
	components: { BaseContainer },
	props: ['user', 'isLoggedIn'],
};
</script>
