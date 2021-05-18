<template>
	<div>
		<TheLoader v-if="isLoading"></TheLoader>
		<h1 class="text-2xl md:text-5xl mb-14">User settings</h1>
		<section class="space-y-12">
			<div id="name" class="flex flex-wrap gap-y-8 gap-x-12">
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
							class="sr-only"
							@change="onFileSelected"
							@keyup.enter.prevent="saveChanges"
						/>
					</label>
				</div>
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
			</div>
			<div>
				<BaseButton
					type="button"
					class="mt-12"
					mode="info"
					@click="saveChanges"
					>Confirm changes
				</BaseButton>
			</div>
		</section>
	</div>
</template>

<script>
import * as fb from '@/firebase';
import { mapGetters } from 'vuex';
import BaseAvatar from 'UI/BaseAvatar';
import BaseButton from 'UI/BaseButton';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { nanoid } from 'nanoid';
import { app } from '../firebase';
import TheLoader from '../components/UI/BaseLoadingSpinner.vue';

export default {
	components: { BaseAvatar, BaseButton, TheLoader },
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
		};
	},
	computed: {
		...mapGetters(['currentUser', 'getCountries', 'currentUserId']),
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
			dayjs.extend(advancedFormat);
			const birthday = dayjs.unix(this.currentUser.birthday.seconds);
			return birthday.format('YYYY-MM-DD');
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
			if (extension !== 'jpg' && extension !== 'png') {
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

			await fb.usersCollection.doc(this.currentUserId).update({
				bio: this.bioData,
				birthday: dayjs(this.birthdayData).$d,
				countryCode: this.getCountries[this.countryData - 1].alpha3Code,
				fname: this.fnameData,
				lname: this.lnameData,
				occupation: this.occupationData,
				photo: this.photoData,
			});
		},
	},
};
</script>
