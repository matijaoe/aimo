<template>
	<BaseContainer fieldset label="Info">
		<div class="flex flex-col gap-8">
			<div class="flex flex-col items-center gap-2">
				<div
					class="p-1 border-[4px] border-amber-400 rounded-full mb-2"
				>
					<BaseAvatar size="xxl" :src="user.photo" />
				</div>
				<div class="flex flex-col justify-center items-center gap-4">
					<div class="flex flex-col items-center gap-1">
						<p class="font-bold text-xl">
							{{ user.fname + ' ' + user.lname }}
						</p>
						<p class="opacity-70 text-sm">@{{ user.username }}</p>
					</div>
					<BaseButton v-if="isLoggedIn" mode="fill">
						<div class="flex items-center gap-2">
							<IconEdit size="sm" />
							<span>Edit</span>
						</div>
					</BaseButton>
					<BaseButton v-else mode="cta">
						<div class="flex items-center gap-2">
							<IconChat size="sm" />
							<span>Message</span>
						</div>
					</BaseButton>
				</div>
			</div>
			<div>
				<div class="grid grid-cols-2 gap-3 mx-4">
					<div
						v-tooltip.left="`From ${countryName}`"
						class="flex items-center justify-end gap-2 py-2 px-4 rounded-lg text-teal-500 bg-teal-50"
					>
						<span>{{ countryName }}</span>
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden"
						>
							<img
								v-if="countryFlag"
								:src="countryFlag"
								alt="Flag"
								class="object-cover h-full"
							/>
						</div>
					</div>
					<div
						v-tooltip.right="'Age'"
						class="flex items-center justify-start gap-2 text-orange-500 py-2 px-4 rounded-lg bg-orange-50"
					>
						<IconCake size="sm" class="text-orange-500" />
						<span>{{ age }} years old</span>
					</div>
					<div
						v-tooltip.left="'Joined on'"
						class="flex items-center justify-end gap-2 text-blue-500 py-2 px-4 rounded-lg bg-blue-50"
					>
						<!-- inace ce tu ic metoda koje izvuce datum iz timestampa -->
						<span>{{ joinDate }}</span>
						<IconCalendar size="sm" class="text-blue-500" />
					</div>
					<div
						v-tooltip.right="'Occupation'"
						class="flex items-center justify-start gap-2 text-indigo-500 py-2 px-4 rounded-lg bg-indigo-50"
					>
						<IconIdentification size="sm" class="text-indigo-500" />
						<span>{{ user.occupation }}</span>
					</div>
				</div>
			</div>
		</div>
	</BaseContainer>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseContainer from 'UI/BaseContainer.vue';
import BaseButton from 'UI/BaseButton.vue';
import IconLocation from 'icons/IconLocation.vue';
import IconEdit from 'icons/IconEdit.vue';
import IconChat from 'icons/IconChat.vue';
import IconCalendar from 'icons/IconCalendar.vue';
import IconCake from 'icons/IconCake.vue';
import IconAcademicHat from 'icons/IconAcademicHat.vue';
import IconIdentification from 'icons/IconIdentification.vue';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

export default {
	components: {
		BaseAvatar,
		BaseContainer,
		BaseButton,
		// IconLocation,
		IconEdit,
		IconChat,
		IconCalendar,
		IconCake,
		// IconAcademicHat,
		IconIdentification,
	},
	props: ['user', 'isLoggedIn'],
	data() {
		return {
			// todo cache flags
			countryName: null,
			countryFlag: null,
		};
	},
	computed: {
		age() {
			const birthday = this.user.birthday;
			return dayjs().diff(birthday, 'year');
		},
		joinDate() {
			dayjs.extend(advancedFormat);
			const date = this.user.joined_on;
			return date.format('MMM Do, YYYY');
		},
	},
	async created() {
		const countryCode = this.user.countryCode;

		const { name, flag } = await this.$axios.$get(
			`https://restcountries.eu/rest/v2/alpha/${countryCode}`
		);

		this.countryName = name.length <= 12 ? name : countryCode;
		this.countryFlag = flag;
	},
};
</script>
