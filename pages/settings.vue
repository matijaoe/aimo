<template>
	<div>
		<h1 class="text-2xl md:text-5xl mb-14">User settings</h1>
		<section class="space-y-12">
			<div id="name" class="flex flex-wrap gap-y-8 gap-x-12">
				<vs-input
					v-model.trim="currentUser.fname"
					label-placeholder="First Name"
					autocomplete="off"
				/>
				<vs-input
					v-model.trim="currentUser.lname"
					label-placeholder="Last Name"
					autocomplete="off"
				/>
				<vs-input
					v-model.trim="birthdayChosen"
					type="date"
					label-placeholder="Birthday"
					autocomplete="off"
				/>
			</div>

			<div class="flex flex-wrap gap-y-8 gap-x-12">
				<vs-input
					v-model.trim="currentUser.occupation"
					label-placeholder="Occupation"
					autocomplete="off"
				/>
				<vs-input
					v-model.trim="currentUser.bio"
					label-placeholder="Profile Bio"
					autocomplete="off"
				/>
			</div>
			<div class="flex flex-wrap gap-y-8 gap-x-12">
				<vs-select
					v-model="countryChosen"
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

export default {
	components: { BaseAvatar, BaseButton },
	data() {
		return {
			countryIndex: '',
		};
	},
	computed: {
		...mapGetters(['currentUser', 'getCountries']),
		country() {
			if (this.countryIndex !== '') {
				console.log(this.currentUser.birthday);
				return this.getCountries[this.countryIndex - 1];
			}
			return '';
		},
		birthday() {
			return this.currentUser.birthday.toDate();
		},
		countryChosen() {
			const countryIndex = this.getCountries.findIndex(
				(country) => country.alpha3Code === this.currentUser.countryCode
			);
			return countryIndex + 1;
		},
		birthdayChosen() {
			console.log(this.currentUser.birthday.toDate());
			return this.currentUser.birthday.toDate();
		},
	},
};
</script>
