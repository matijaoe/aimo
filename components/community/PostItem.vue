<template>
	<BaseContainer class="space-y-2">
		<PostHeader :todo="todo" />
		<PostDetails :todo="todo" />
		<PostOptions :todo="todo" />
	</BaseContainer>
</template>

<script>
import BaseContainer from 'UI/BaseContainer';
import { mapGetters } from 'vuex';
import PostHeader from './PostHeader';
import PostDetails from './PostDetails';
import PostOptions from './PostOptions';

export default {
	components: {
		PostDetails,
		PostOptions,
		PostHeader,
		BaseContainer,
	},
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	computed: {
		...mapGetters(['getCategoryById']),
	},
};
</script>
