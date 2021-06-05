<template>
	<div>
		<vs-dialog
			v-model="isLoading"
			not-close
			not-padding
			blur
			loading
		></vs-dialog>
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
				<div class="space-y-4">
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
					<div class="flex items-center justify-center gap-1">
						<BaseButton
							v-tooltip.right="'Login with Google'"
							mode="ghost"
							type="button"
							@click="signUpWithGoogle"
						>
							<i class="bx bxl-google text-xl" />
						</BaseButton>
					</div>
				</div>
			</form>
			<SignUpForm
				v-if="mode === 'signup'"
				@switch-auth-mode="switchAuthMode"
				@set-loading="setLoading"
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
import firebase from 'firebase';
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';
import { random as _random } from 'lodash';
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
			isLoading: false,
		};
	},
	computed: {
		...mapGetters('users', ['users']),
		...mapGetters('colors', ['getRandomColor']),
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
		async signUpWithGoogle() {
			const googleProvider = new firebase.auth.GoogleAuthProvider();
			try {
				const response = await this.$fire.auth.signInWithPopup(
					googleProvider
				);
				if (response.additionalUserInfo.isNewUser) {
					const firstName =
						response.additionalUserInfo.profile.given_name;
					const lastName =
						response.additionalUserInfo.profile.family_name;
					const color = this.getRandomColor;
					const username = this.createNewUsername(
						firstName,
						lastName
					);
					const newUser = {
						fname: firstName,
						lname: lastName,
						countryCode: '',
						birthday: null,
						joined_on: dayjs().$d,
						photo: `https://avatar.oxro.io/avatar.svg?name=${firstName}+${lastName}&caps=1&fontSize=200&bold=true&background=${color.bg}&color=${color.text}`,
						occupation: '',
						bio: '',
						coins: 400,
						isPremium: false,
						socials: [],
						partners: [],
						uid: response.user.uid,
					};
					await this.$store.dispatch('users/addNewUser', {
						username,
						user: newUser,
					});
					this.$router.replace('/home');
				}
			} catch (err) {
				console.log(err);
			}
		},
		createNewUsername(fname, lname) {
			while (true) {
				const username = `${fname.toLowerCase()}${lname
					.charAt(0)
					.toLowerCase()}${_random(1000, 9999)}`;
				if (!this.users.map((usr) => usr.username).includes(username))
					return username;
			}
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
			};

			try {
				this.setLoading(true);
				await this.$store.dispatch('login', actionPayload);
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
				this.setLoading(false);
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
		setLoading(isLoading) {
			this.isLoading = isLoading;
		},
	},
};
</script>
