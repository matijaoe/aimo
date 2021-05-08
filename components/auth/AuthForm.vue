<template>
	<form class="space-y-7" @submit.prevent="submitForm">
		<vs-input v-model.trim="email" label-placeholder="Email">
			<template v-if="!validEmail" #message-danger>
				Invalid email
			</template>
		</vs-input>
		<vs-input
			v-model="password"
			type="password"
			label-placeholder="Password"
		>
			<template v-if="validPassword && !!password" #message-success>
				Secure password
			</template>
			<template v-else-if="insecurePassword" #message-warn>
				Insecure password
			</template>
			<template v-else-if="!validPassword" #message-danger>
				Incorrect password
			</template>
		</vs-input>

		<transition name="fade" mode="out-in">
			<div
				v-if="mode === 'login'"
				key="1"
				class="flex items-center justify-between gap-1"
			>
				<BaseButton mode="cta">Login</BaseButton>
				<BaseButton
					type="button"
					mode="ghost"
					class="ml-1"
					@click="switchAuthMode"
					>Signup
				</BaseButton>
			</div>
			<div
				v-if="mode === 'signup'"
				key="2"
				class="flex items-center justify-between gap-1"
			>
				<BaseButton mode="cta">Signup</BaseButton>
				<BaseButton
					type="button"
					mode="ghost"
					class="ml-1"
					@click="switchAuthMode"
					>Login
				</BaseButton>
			</div>
		</transition>
	</form>
</template>

<script>
import BaseButton from 'UI/BaseButton.vue';

export default {
	components: {
		BaseButton,
	},
	data() {
		return {
			mode: 'login',
			formIsValid: true,
			email: '',
			password: '',
		};
	},
	computed: {
		validEmail() {
			return true;
		},
		validPassword() {
			return true;
		},
		insecurePassword() {
			return false;
		},
	},
	methods: {
		async submitForm() {},
		switchAuthMode() {
			this.mode = this.mode === 'login' ? 'signup' : 'login';
		},
	},
};
</script>
