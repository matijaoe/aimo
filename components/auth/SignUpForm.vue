<template>
	<div class="space-y-7">
		<div v-if="step === 1" class="space-y-7">
			<vs-input
				v-model.trim="username"
				label-placeholder="Username"
				autocomplete="off"
				@input="validate"
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
			/>
			<vs-input
				v-model.trim="lname"
				label-placeholder="Last Name"
				autocomplete="off"
				@input="validate"
			/>
		</div>
		<div v-if="step === 3" class="space-y-7">
			<vs-input
				v-model.trim="occupation"
				label-placeholder="Occupation"
				autocomplete="off"
				@input="validate"
			/><vs-input
				v-model.trim="birthday"
				type="date"
				label-placeholder="Birthday"
				autocomplete="off"
				@input="validate"
			/>
		</div>
		<div v-if="step === 4" class="space-y-7">
			<vs-input
				v-model.trim="bio"
				label-placeholder="Profile Bio"
				autocomplete="off"
				@input="validate"
			/>
			<vs-select
				v-model="countryIndex"
				filter
				placeholder="Country"
				@input="validate"
			>
				<vs-option
					v-for="(countryOption, index) in getCountries"
					:key="countryOption.alpha3Code"
					:label="countryOption.name"
					:value="index + 1"
				>
					<div class="flex items-center gap-2">
						<BaseAvatar size="xs" :src="countryOption.flag" />
						<p class="text-sm font-medium">
							{{ countryOption.name }}
						</p>
					</div>
				</vs-option>
			</vs-select>
		</div>
		<form v-if="step === 5" class="space-y-7" @submit.prevent="submitForm">
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
				v-if="step !== 5"
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
			<div class="flex items-center justify-center gap-1">
				<BaseButton
					v-tooltip.right="'Signup with Google'"
					mode="ghost"
					type="button"
					:disabled="!username || usernameCheck"
					@click="signUpWithGoogle"
				>
					<i class="bx bxl-google text-xl" />
				</BaseButton>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import BaseButton from 'UI/BaseButton';
import BaseAvatar from 'UI/BaseAvatar';
import firebase from 'firebase';

import isEmpty from 'lodash.isempty';

export default {
	components: { BaseButton, BaseAvatar },
	emits: ['switch-auth-mode'],
	data() {
		return {
			step: 1,
			invalid: true,
			fname: '',
			lname: '',
			occupation: '',
			birthday: '',
			username: '',
			bio: '',
			countryIndex: '',
			email: '',
			password: '',
			hasVisiblePassword: false,
		};
	},
	computed: {
		...mapGetters(['getCountries']),
		...mapGetters('users', ['users']),
		...mapGetters('colors', ['getRandomColor']),
		country() {
			if (this.countryIndex !== '') {
				return this.getCountries[this.countryIndex - 1];
			}
			return '';
		},
		usernameCheck() {
			return this.users
				.map((user) => user.username)
				.includes(this.username);
		},
		userInfo() {
			if (this.step === 5) {
				const color = this.getRandomColor;
				return {
					fname: this.fname,
					lname: this.lname,
					countryCode: this.country.alpha3Code,
					birthday: dayjs(this.birthday).$d,
					joined_on: dayjs().$d,
					photo: `https://avatar.oxro.io/avatar.svg?name=${this.fname}+${this.lname}&caps=1&fontSize=200&bold=true&background=${color.bg}&color=${color.text}`,
					occupation: this.occupation,
					bio: this.bio,
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
			} else if (
				this.step === 3 &&
				(!this.occupation || !this.birthday)
			) {
				this.invalid = true;
				return false;
			} else if (this.step === 4 && (!this.bio || !this.countryIndex)) {
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
					const newUser = {
						fname: firstName,
						lname: lastName,
						countryCode: 'HRV',
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
						username: this.username,
						user: newUser,
					});
					this.$router.replace('/home');
				}
			} catch (err) {
				console.log(err);
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
				username: this.username,
				userInfo: this.userInfo,
			};

			try {
				await this.$store.dispatch('signup', actionPayload);
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
	},
};
</script>
