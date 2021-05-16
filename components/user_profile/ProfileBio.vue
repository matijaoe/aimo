<template>
	<BaseContainer fieldset label="Bio">
		<p v-if="user.bio">{{ user.bio }}</p>
		<BaseTag v-else>User has no bio.</BaseTag>
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseTag from 'UI/BaseTag.vue';

export default {
	components: { BaseContainer, BaseTag },
	props: ['user'],
};
</script>
