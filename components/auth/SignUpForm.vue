<template>
	<div class="space-y-7">
		<div v-if="step === 1" class="space-y-7">
			<vs-input
				v-model.trim="username"
				label-placeholder="Username"
				autocomplete="off"
				@input="validate"
				@keyup.enter.prevent="nextStep"
			>
				<template v-if="usernameCheck" #message-danger>
					Username already exists.
				</template>
				<template v-else-if="!username" #message-warn>
					Required.
				</template>
				<template v-else #message-success>
					Username is available
				</template>
			</vs-input>
		</div>
		<div v-if="step === 2" class="space-y-7">
			<vs-input
				v-model.trim="fname"
				label-placeholder="First Name"
				autocomplete="off"
				@input="validate"
				@keyup.enter.prevent="nextStep"
			/>
			<vs-input
				v-model.trim="lname"
				label-placeholder="Last Name"
				autocomplete="off"
				@input="validate"
				@keyup.enter.prevent="nextStep"
			/>
		</div>
		<form v-if="step === 3" class="space-y-7" @submit.prevent="submitForm">
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
				<template v-if="!validEmail && email !== ''" #message-danger>
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
					<i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
					<i v-else class="bx bx-hide"></i>
				</template>
			</vs-input>
			<BaseButton mode="cta" :disabled="!validEmail && !password">
				SignUp
			</BaseButton>
		</form>
		<div class="space-y-4">
			<div
				v-if="step !== 3"
				class="flex items-center justify-between gap-1"
			>
				<BaseButton
					mode="cta"
					:disabled="invalid"
					@click.prevent="nextStep"
					>Next</BaseButton
				>
				<BaseButton
					type="button"
					mode="ghost"
					class="ml-1"
					@click.prevent="$emit('switch-auth-mode')"
					>Login
				</BaseButton>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import BaseButton from 'UI/BaseButton';
import isEmpty from 'lodash.isempty';

export default {
	components: { BaseButton },
	emits: ['switch-auth-mode', 'set-loading'],
	data() {
		return {
			step: 1,
			invalid: true,
			fname: '',
			lname: '',
			username: '',
			email: '',
			password: '',
			hasVisiblePassword: false,
			error: null,
		};
	},
	computed: {
		...mapGetters('users', ['users']),
		...mapGetters('colors', ['getRandomColor']),
		usernameCheck() {
			return this.users
				.map((user) => user.username)
				.includes(this.username);
		},
		userInfo() {
			if (this.step === 3) {
				const color = this.getRandomColor;
				return {
					fname: this.fname,
					lname: this.lname,
					countryCode: '',
					birthday: '',
					joined_on: dayjs().$d,
					photo: `https://avatar.oxro.io/avatar.svg?name=${this.fname}+${this.lname}&caps=1&fontSize=200&bold=true&background=${color.bg}&color=${color.text}`,
					occupation: '',
					bio: '',
					coins: 400,
					isPremium: false,
					socials: [],
					partners: [],
				};
			}
			return '';
		},
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
		validate() {
			if (this.step === 1 && this.usernameCheck && !this.username) {
				this.invalid = true;
				return false;
			}
			if (this.step === 2 && (!this.fname || !this.lname)) {
				this.invalid = true;
				return false;
			}
			this.invalid = false;
			return true;
		},
		nextStep() {
			if (this.validate()) {
				this.invalid = true;
				this.step++;
			}
		},
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
				username: this.username,
				userInfo: this.userInfo,
			};

			let loading = null;
			try {
				this.$emit('set-loading', true);
				loading = this.$vs.loading({
					type: 'points',
					color: '#fff',
				});
				await this.$store.dispatch('signup', actionPayload);
				this.$router.replace('/home');
			} catch (err) {
				// firebase auth errors
				if (err.code === 'auth/email-already-in-use') {
					this.error = 'Email already in use.';
				} else if (err.code === 'auth/user-not-found') {
					this.error =
						'Email does not exist. Use valid email or sign up!';
				} else if (err.code === 'auth/wrong-password') {
					this.error = 'Invalid password. Please try again!';
				} else {
					this.error = 'Failed to authenticate, try again later.';
				}
				this.openErrorModal();
			} finally {
				loading.close();
				this.$emit('set-loading', false);
			}
		},
	},
};
</script>
