<template>
	<div>
		<h1 class="text-2xl md:text-5xl mb-14">User settings</h1>
		<section class="space-y-12">
			<div id="name" class="flex flex-wrap gap-y-8 gap-x-12">
				<vs-input
					v-model.trim="fnameData"
					label-placeholder="First Name"
					autocomplete="off"
				/>
				<vs-input
					v-model.trim="lnameData"
					label-placeholder="Last Name"
					autocomplete="off"
				/>
				<vs-input
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
				/>
				<vs-input
					v-model.trim="bioData"
					label-placeholder="Profile Bio"
					autocomplete="off"
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
			<div class="mt-16">
				<BaseButton type="button" mode="info"
					>Confirm changes
				</BaseButton>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseAvatar from 'UI/BaseAvatar';
import BaseButton from 'UI/BaseButton';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

export default {
	components: { BaseAvatar, BaseButton },
	data() {
		return {
			countryIndex: '',
			birthdayData: '',
			countryData: '',
			fnameData: '',
			lnameData: '',
			occupationData: '',
			bioData: '',
		};
	},
	computed: {
		...mapGetters(['currentUser', 'getCountries']),
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
			return birthday.format('DD-MM-YYYY');
		},
	},
	created() {
		this.countryData = this.countryChosen;
		this.birthdayData = this.birthdayChosen;
		this.fnameData = this.currentUser.fname;
		this.lnameData = this.currentUser.lname;
		this.occupationData = this.currentUser.occupation;
		this.bioData = this.currentUser.bio;
	},
};
</script>
