<template>
	<div class="flex-shrink-0">
		<img :src="src" alt="user avatar" class="w-8 h-8 rounded-full" />
	</div>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			default:
				'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png',
		},
	},
};
</script>
