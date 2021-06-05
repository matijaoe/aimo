<template>
	<vs-dialog v-model="showDialog" @close="resetDialog">
		<template #header>
			<h4 class="not-margin">Welcome to <b>Support</b></h4>
		</template>
		<div>
			<p>DIV</p>
		</div>
		<template #footer>
			<BaseButton>Support</BaseButton>
		</template>
	</vs-dialog>
</template>

<script>
import BaseButton from '../UI/BaseButton';
export default {
	components: { BaseButton },
	inject: ['setPostDetails'],
	props: {
		postDetails: {
			type: Object,
			required: false,
			default: null,
		},
	},
	data() {
		return {
			showDialog: false,
		};
	},
	methods: {
		toggleDialog() {
			this.showDialog = !this.showDialog;
		},
		resetDialog() {
			console.log('Closing');
			this.setPostDetails(null);
		},
	},
};
</script>
