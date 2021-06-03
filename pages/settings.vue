<template>
	<div>
		<TheLoader v-if="isLoading"></TheLoader>
		<h1 class="text-2xl md:text-5xl mb-14">User settings</h1>
		<section class="space-y-12">
			<div id="name" class="flex flex-wrap gap-y-8 gap-x-12 relative">
				<div class="p-1 border-[4px] border-gray-200 rounded-full mb-2">
					<label
						for="file-upload"
						class="cursor-pointer bg-white hover:text-indigo-500"
					>
						<BaseAvatar
							v-tooltip.right="'Change profile picture'"
							size="xxl"
							:src="photoData"
							class="hover:opacity-75"
						/>
						<input
							id="file-upload"
							name="file-upload"
							type="file"
							accept=".jpg, .jpeg, .png"
							class="sr-only"
							@change="onFileSelected"
							@keyup.enter.prevent="saveChanges"
						/>
					</label>
				</div>
				<BaseButton
					v-if="hasCustomPicture"
					id="removePicBtn"
					v-tooltip.right="'Remove profile picture'"
					square
					class="absolute z-40 left-[90px] top-[88px]"
					mode="warn"
					@click="removePicture"
				>
					<IconExit />
				</BaseButton>
			</div>
			<div id="name" class="flex flex-wrap gap-y-8 gap-x-12">
				<div>
					<vs-input
						id="fname"
						v-model.trim="fnameData"
						label-placeholder="First Name"
						autocomplete="off"
						:danger="!fnameData || !checkIfLetters(fnameData)"
						@keyup.enter="saveChanges"
					/>
				</div>

				<vs-input
					id="lname"
					v-model.trim="lnameData"
					label-placeholder="Last Name"
					autocomplete="off"
					:danger="!lnameData || !checkIfLetters(lnameData)"
					@keyup.enter="saveChanges"
				/>
				<vs-input
					v-model="birthdayData"
					type="date"
					label-placeholder="Birthday"
					autocomplete="off"
				/>
			</div>

			<div class="flex flex-wrap gap-y-8 gap-x-12">
				<vs-input
					v-model.trim="occupationData"
					label-placeholder="Occupation"
					autocomplete="off"
					@keyup.enter="saveChanges"
				/>
				<vs-input
					v-model.trim="bioData"
					label-placeholder="Profile Bio"
					autocomplete="off"
					@keyup.enter="saveChanges"
				/>
			</div>
			<div class="flex flex-wrap gap-y-8 gap-x-12">
				<vs-select
					v-model="countryData"
					filter
					placeholder="Country"
					autocomplete="off"
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

				<BaseButton
					type="button"
					mode="fill"
					@click="activeSocialsPopup = !activeSocialsPopup"
					>Add social
				</BaseButton>
				<div class="center">
					<vs-dialog v-model="activeSocialsPopup">
						<div
							id="socials"
							class="flex flex-col flex-wrap items-center gap-y-8 mt-3"
						>
							<vs-select
								v-model="newSocialData"
								filter
								placeholder="Socials"
								autocomplete="off"
							>
								<vs-option
									v-for="(social, index) in filteredSocials"
									:key="social.name"
									:label="social.name"
									:value="index + 1"
								>
									<BaseBrandIcon
										id="brandIcon"
										:brand="social.name"
									/>

									<div class="flex items-center gap-2">
										<p class="text-sm font-medium mt-2">
											{{ social.name }}
										</p>
									</div>
								</vs-option>
							</vs-select>
							<BaseBrandIcon
								v-if="newSocialData !== ''"
								:brand="filteredSocials[newSocialData - 1].name"
								class="pointer-events-none"
							/>
							<vs-input
								v-model.trim="newSocialUrl"
								label-placeholder="Enter your profile URL"
								autocomplete="off"
							/>
							<BaseButton
								type="button"
								mode="fill"
								@click="updateUserSocials"
								>Add</BaseButton
							>
						</div>
					</vs-dialog>
				</div>
				<div class="center">
					<vs-table>
						<template #thead>
							<vs-tr>
								<vs-th> ID </vs-th>
								<vs-th> URL </vs-th>
							</vs-tr>
						</template>
						<template #tbody>
							<vs-tr
								v-for="social in socialsData"
								:key="social.id"
								:data="social"
							>
								<vs-td>
									{{ social.id }}
								</vs-td>
								<vs-td
									v-tooltip="'Edit social URL'"
									edit
									@click="
										(edit = social),
											(editProp = 'url'),
											(editActive = true)
									"
								>
									{{ social.url }}
								</vs-td>
							</vs-tr>
						</template>
					</vs-table>

					<vs-dialog v-model="editActive">
						<template #header>
							Change Prop {{ editProp }}
						</template>
						<div class="flex flex-col items-center">
							<vs-input
								v-if="editProp == 'url'"
								v-model="edit[editProp]"
								type="url"
								@keypress.enter="editActive = false"
							/>
						</div>
					</vs-dialog>
				</div>
			</div>
			<div>
				<BaseButton
					type="button"
					class="mt-10"
					mode="info"
					@click="saveChanges"
					>Confirm changes
				</BaseButton>
				<p v-if="updated" class="text-amber-500 mt-1">Updated!</p>
			</div>
		</section>
	</div>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar';
import BaseButton from 'UI/BaseButton';
import BaseBrandIcon from 'UI/BaseBrandIcon.vue';
import * as fb from '@/firebase';
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { nanoid } from 'nanoid';
import IconExit from 'icons/IconExit';
import { app } from '../firebase';
import TheLoader from '../components/UI/BaseLoadingSpinner.vue';

export default {
	components: { BaseAvatar, BaseButton, BaseBrandIcon, TheLoader, IconExit },
	data() {
		return {
			countryIndex: '',
			birthdayData: '',
			countryData: '',
			fnameData: '',
			lnameData: '',
			occupationData: '',
			bioData: '',
			photoData: '',
			maximumFileSize: 5, // in MB
			isLoading: false,
			hasCustomPicture: false,
			color: '',
			updated: false,
			activeSocialsPopup: false,
			socialsData: [],
			newSocialData: '',
			newSocialUrl: '',
			filteredSocials: [],
			editActive: false,
			edit: null,
			editProp: {},
		};
	},
	computed: {
		...mapGetters([
			'currentUser',
			'getCountries',
			'currentUserId',
			'socials',
		]),
		...mapGetters('colors', ['getRandomColor']),
		country() {
			if (this.countryIndex !== '') {
				return this.getCountries[this.countryIndex - 1];
			}
			return '';
		},
		countryChosen() {
			const countryIndex = this.getCountries.findIndex(
				(country) => country.alpha3Code === this.currentUser.countryCode
			);
			return countryIndex + 1;
		},
		birthdayChosen() {
			if (!this.currentUser.birthday) {
				return '';
			}
			dayjs.extend(advancedFormat);
			const birthday = dayjs.unix(this.currentUser.birthday.seconds);
			return birthday.format('YYYY-MM-DD');
		},
		socialsWithoutUserSocials() {
			let socialsArray = this.socials;
			for (const social of this.socialsData) {
				socialsArray = socialsArray.filter((s) => social.id !== s.name);
			}
			return socialsArray;
		},
	},
	created() {
		this.countryData = this.countryChosen;
		this.birthdayData = this.birthdayChosen;
		this.fnameData = this.currentUser.fname;
		this.lnameData = this.currentUser.lname;
		this.occupationData = this.currentUser.occupation;
		this.bioData = this.currentUser.bio;
		this.photoData = this.currentUser.photo;
		this.color = this.getRandomColor;
		this.socialsData = this.currentUser.socials;
		this.filteredSocials = this.socialsWithoutUserSocials;
		if (!this.photoData.includes('https://avatar.oxro.io/avatar.svg')) {
			this.hasCustomPicture = true;
		}
	},
	methods: {
		async onFileSelected(ev) {
			const file = ev.target.files[0];

			if (!this.checkFileExtension(file.name.split('.')[1])) {
				return;
			}

			if (!this.checkFileSize(file.size)) {
				return;
			}
			this.isLoading = true;

			const storageRef = app.storage().ref();
			const fileName = nanoid();
			const fileRef = storageRef.child(fileName);
			await fileRef.put(file);
			const fileUrl = await fileRef.getDownloadURL();

			this.photoData = fileUrl;

			setTimeout(() => {
				this.isLoading = false;
			}, 200);
			this.hasCustomPicture = true;
		},
		checkFileSize(fileSize) {
			if (fileSize > 1048576 * this.maximumFileSize) {
				alert(
					`Your file is too large. Maximum size is ${this.maximumFileSize}MB.`
				);
				return false;
			} else {
				return true;
			}
		},
		checkFileExtension(extension) {
			if (
				extension !== 'jpg' &&
				extension !== 'jpeg' &&
				extension !== 'png'
			) {
				alert(`Your file extension (${extension}) is not allowed!`);
				return false;
			} else {
				return true;
			}
		},
		checkIfLetters(text) {
			if (/^[a-zA-Z]/.test(text)) {
				return true;
			} else {
				return false;
			}
		},
		async saveChanges() {
			if (this.fnameData.trim() === '' || this.lnameData.trim() === '') {
				alert('You have to enter your First Name and Last Name!');
				return;
			}

			if (
				!this.checkIfLetters(this.fnameData) ||
				!this.checkIfLetters(this.lnameData)
			) {
				alert('First name and last name must contain only letters!');
				return;
			}

			if (
				this.photoData === this.currentUser.photo &&
				(this.fnameData !== this.currentUser.fname ||
					this.lnameData !== this.currentUser.lname)
			) {
				this.photoData = `https://avatar.oxro.io/avatar.svg?name=${this.fnameData.charAt(
					0
				)}+${this.lnameData.charAt(
					0
				)}&caps=1&fontSize=200&bold=true&background=${
					this.color.bg
				}&color=${this.color.text}`;
			}

			const birthday = this.birthdayData
				? dayjs(this.birthdayData).$d
				: '';

			const countryCode = this.countryData
				? this.getCountries[this.countryData - 1].alpha3Code
				: '';

			await fb.usersCollection.doc(this.currentUserId).update({
				bio: this.bioData,
				birthday,
				countryCode,
				fname: this.fnameData,
				lname: this.lnameData,
				occupation: this.occupationData,
				photo: this.photoData,
			});
			this.updated = true;
		},
		removePicture() {
			this.isLoading = true;
			if (
				this.fnameData !== '' &&
				this.checkIfLetters(this.fnameData) &&
				this.lnameData !== '' &&
				this.checkIfLetters(this.lnameData)
			) {
				this.photoData = `https://avatar.oxro.io/avatar.svg?name=${this.fnameData.charAt(
					0
				)}+${this.lnameData.charAt(
					0
				)}&caps=1&fontSize=200&bold=true&background=${
					this.color.bg
				}&color=${this.color.text}`;
			} else {
				this.photoData = `https://avatar.oxro.io/avatar.svg?name=${this.currentUser.fname.charAt(
					0
				)}+${this.currentUser.lname.charAt(
					0
				)}&caps=1&fontSize=200&bold=true&background=${
					this.color.bg
				}&color=${this.color.text}`;
			}
			this.hasCustomPicture = false;
			setTimeout(() => {
				this.isLoading = false;
			}, 100);
		},
		async updateUserSocials() {
			if (this.newSocialData && this.newSocialUrl !== '') {
				const userRef = await fb.usersCollection
					.doc(this.currentUserId)
					.get();

				const userSocials = userRef.data().socials;

				const newSocial = {
					id: this.filteredSocials[this.newSocialData - 1].name,
					url: this.newSocialUrl,
				};

				userSocials.push(newSocial);
				console.log(userSocials);

				await fb.usersCollection.doc(this.currentUserId).update({
					socials: userSocials,
				});

				this.filteredSocials = this.filteredSocials.filter(
					(s) => newSocial.id !== s.name
				);
				this.activeSocialsPopup = false;
			}
			this.socialsData = this.currentUser.socials;
			this.newSocialData = '';
			this.newSocialUrl = '';
		},
	},
};
</script>

<style scoped>
#removePicBtn {
	transform: scale(0.75, 0.75);
}
#brandIcon {
	transform: scale(0.7, 0.7);
}
</style>
