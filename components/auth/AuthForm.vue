<template>
	<div>
		<transition name="fade" mode="out-in">
			<form
				v-if="mode === 'login'"
				class="space-y-7"
				@submit.prevent="submitForm"
			>
				<div class="space-y-7">
					<vs-input
						v-model.trim="email"
						icon-after
						label-placeholder="Email"
						autocomplete="off"
						@focus="handleError"
					>
						<template v-if="validEmail" #message-success>
							Email Valid
						</template>
						<template
							v-if="!validEmail && email !== ''"
							#message-danger
						>
							Email Invalid
						</template>
						<template #icon>
							<i class="bx bx-user"></i>
						</template>
					</vs-input>
					<vs-input
						v-model="password"
						type="password"
						label-placeholder="Password"
						:progress="getProgress"
						:visible-password="hasVisiblePassword"
						icon-after
						@click-icon="hasVisiblePassword = !hasVisiblePassword"
						@focus="handleError"
					>
						<template #icon>
							<i
								v-if="!hasVisiblePassword"
								class="bx bx-show-alt"
							></i>
							<i v-else class="bx bx-hide"></i>
						</template>
					</vs-input>
				</div>

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
				<!--
				<transition name="fade" mode="out-in">
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
				-->
			</form>
			<SignUpForm
				v-if="mode === 'signup'"
				@switch-auth-mode="switchAuthMode"
			/>
		</transition>

		<!-- <div v-if="error" class="mt-8 max-w-[160px]">
			<p class="font-semibold text-red-500 text-sm">{{ error }}</p>
		</div> -->
	</div>
</template>

<script>
import BaseButton from 'UI/BaseButton.vue';
import isEmpty from 'lodash.isempty';
import SignUpForm from './SignUpForm';

export default {
	components: {
		SignUpForm,
		BaseButton,
	},
	data() {
		return {
			mode: 'login',
			formIsValid: true,
			email: '',
			password: '',
			hasVisiblePassword: false,
			error: null,
		};
	},
	computed: {
		validPassword() {
			return !(isEmpty(this.password) || this.password.length < 6);
		},
		insecurePassword() {
			return false;
		},
		validEmail() {
			// eslint-disable-next-line no-useless-escape
			const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(this.email);
		},
		getProgress() {
			let progress = 0;

			// at least one number
			if (/\d/.test(this.password)) {
				progress += 20;
			}

			// at least one capital letter
			if (/(.*[A-Z].*)/.test(this.password)) {
				progress += 20;
			}

			// at menons a lowercase
			if (/(.*[a-z].*)/.test(this.password)) {
				progress += 20;
			}

			// more than 5 digits
			if (this.password.length >= 6) {
				progress += 20;
			}

			// at least one special character
			if (/[^A-Za-z0-9]/.test(this.password)) {
				progress += 20;
			}

			return progress;
		},
	},
	methods: {
		async submitForm() {
			this.formIsValid = true;
			if (!this.validEmail || !this.validPassword) {
				this.formIsValid = false;
				this.error = 'Please check your details';
				this.openErrorModal();
				return;
			}

			const actionPayload = {
				email: this.email,
				password: this.password,
			};

			// doslovno c/p od max coachesa
			try {
				await this.$store.dispatch('login', actionPayload);
				this.$router.replace('/home');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);

				// firebase auth errors
				if (err.message === 'EMAIL_EXISTS') {
					this.error = 'Email already in use.';
				} else if (err.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
					this.error =
						'We have blocked all requests from this device due to unusual activity. Try again later.';
				} else if (err.message === 'EMAIL_NOT_FOUND') {
					this.error = 'Email not found.';
				} else if (err.message === 'INVALID_PASSWORD') {
					this.error = 'Invalid password.';
				} else if (err.message === 'USER_DISABLED') {
					this.error =
						'Account has been disabled by an administrator.';
				} else {
					this.error = 'Failed to authenticate, try again later.';
				}
				this.openErrorModal();
			}
		},
		switchAuthMode() {
			this.mode = this.mode === 'login' ? 'signup' : 'login';
		},
		validatePassword() {
			if (this.isEmpty(this.password) || this.password.length < 6) {
				return false;
			} else {
				return true;
			}
		},
		// todo doesnt work with custom options
		errorModal() {
			this.$vs.notification({
				title: '😕',
				text: this.error,
			});
		},
		openErrorModal() {
			this.errorModal('top-right', 'primary');
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>
