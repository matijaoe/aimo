<template>
	<div class="pb-6">
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
			</div>
			<div class="flex flex-wrap gap-y-8">
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
								@keyup.enter="updateUserSocials"
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
				<div
					id="socialsTable"
					class="center flex flex-col gap-y-6 items-start"
				>
					<vs-table v-if="socialsData.length > 0">
						<template #thead>
							<vs-tr>
								<vs-th> Social </vs-th>
								<vs-th> Profile URL </vs-th>
							</vs-tr>
						</template>
						<template #tbody>
							<vs-tr
								v-for="social in socialsData"
								:key="social.id"
								:data="social"
							>
								<vs-td>
									<BaseBrandIcon
										id="brandIcon"
										:brand="social.id"
									/>
								</vs-td>
								<vs-td
									v-tooltip="'Edit social URL'"
									edit
									@click="
										(edit = social),
											(editProp = 'url'),
											(editActive = true),
											(updatedUrlData = edit[editProp])
									"
								>
									{{ social.url }}
								</vs-td>
								<vs-td>
									<BaseButton
										id="removeSocialBtn"
										v-tooltip.right="'Remove social'"
										class="mr-2"
										square
										mode="warn"
										@click="
											(activeSocialsRemovePopup = true),
												(removingSocialId = social.id)
										"
									>
										<IconExit />
									</BaseButton>

									<div class="center">
										<vs-dialog
											v-model="activeSocialsRemovePopup"
										>
											<div
												class="flex flex-col gap-y-6 items-center"
											>
												<h1 class="mt-2">
													Are you sure?
												</h1>
												<div class="flex gap-x-6">
													<BaseButton
														mode="warn"
														@click="removeSocial"
													>
														Remove
													</BaseButton>
													<BaseButton
														mode="fill"
														@click="
															activeSocialsRemovePopup = false
														"
													>
														Cancel
													</BaseButton>
												</div>
											</div>
										</vs-dialog>
									</div>
								</vs-td>
							</vs-tr>
							<vs-tr>
								<vs-td>
									<BaseButton
										id="addSocialBtn"
										v-tooltip.right="'Add social'"
										mode="fill"
										square
										@click="
											activeSocialsPopup = !activeSocialsPopup
										"
									>
										<IconPlus />
									</BaseButton>
								</vs-td>
							</vs-tr>
						</template>
					</vs-table>
					<div v-else>
						<p class="mb-1">You don't have any socials yet</p>
						<BaseButton
							id="addSocialBtn"
							v-tooltip.right="'Add social'"
							mode="fill"
							square
							@click="activeSocialsPopup = !activeSocialsPopup"
						>
							<IconPlus />
						</BaseButton>
					</div>

					<vs-dialog v-model="editActive">
						<template #header> Change social URL </template>
						<div class="flex flex-col items-center gap-y-6">
							<vs-input
								v-if="editProp == 'url'"
								id="inputUpdateUrl"
								v-model.trim="updatedUrlData"
								type="url"
								@keypress.enter="updateSocialUrl"
							/>
							<BaseButton
								type="button"
								mode="info"
								@click="updateSocialUrl"
								>Confirm changes
							</BaseButton>
						</div>
					</vs-dialog>
				</div>
			</div>
			<div class="flex gap-4 items-center mb-6">
				<BaseButton
					type="button"
					class="mt-10"
					mode="info"
					@click="saveChanges"
					>Confirm changes
				</BaseButton>
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
import IconPlus from 'icons/IconPlus';
import { app } from '../firebase';
import TheLoader from '../components/UI/BaseLoadingSpinner.vue';

export default {
	components: {
		BaseAvatar,
		BaseButton,
		BaseBrandIcon,
		TheLoader,
		IconExit,
		IconPlus,
	},
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
			updatedUrlData: '',
			activeSocialsRemovePopup: false,
			removingSocialId: '',
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
			this.$vs.notification({
				title: 'Updated 🥰',
				text: 'You successfully updated your information.',
				color: 'success',
			});
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

				await this.updateSocialsInDatabase(userSocials);
				this.activeSocialsPopup = false;
			}
			this.newSocialData = '';
			this.newSocialUrl = '';
		},
		async updateSocialUrl() {
			if (this.updatedUrlData !== '') {
				const index = this.socialsData.findIndex(
					(soc) => soc.id === this.edit.id
				);

				const userRef = await fb.usersCollection
					.doc(this.currentUserId)
					.get();

				const userSocials = userRef.data().socials;

				userSocials[index].url = this.updatedUrlData;

				await this.updateSocialsInDatabase(userSocials);
			}
			this.editActive = false;
		},
		async removeSocial() {
			const userRef = await fb.usersCollection
				.doc(this.currentUserId)
				.get();

			const userSocials = userRef.data().socials;

			const index = userSocials.findIndex(
				(s) => s.id === this.removingSocialId
			);
			userSocials.splice(index, 1);

			await this.updateSocialsInDatabase(userSocials);

			this.activeSocialsRemovePopup = false;
		},
		async updateSocialsInDatabase(userSocials) {
			await fb.usersCollection.doc(this.currentUserId).update({
				socials: userSocials,
			});
			this.socialsData = userSocials;
			this.filteredSocials = this.socialsWithoutUserSocials;
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
#addSocialBtn {
	transform: scale(0.8, 0.8);
}
#removeSocialBtn {
	transform: scale(0.6, 0.6);
	position: relative;
	bottom: 2px;
}
#socialsTable {
	position: relative;
	bottom: 6px;
}
</style>
