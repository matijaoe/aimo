<template>
	<BaseContainer fieldset label="Info">
		<div class="flex flex-col gap-8">
			<div class="flex flex-col items-center gap-2">
				<div class="p-1 border-[4px] border-gray-200 rounded-full mb-2">
					<BaseAvatar size="xxl" :src="user.photo" />
				</div>
				<div class="flex flex-col justify-center items-center gap-4">
					<div class="flex flex-col items-center gap-1">
						<p class="font-bold text-xl">
							{{ user.fname + ' ' + user.lname }}
						</p>
						<p class="opacity-70 text-sm">@{{ user.username }}</p>
					</div>
					<BaseButton
						v-if="isLoggedIn"
						mode="fill"
						link
						:to="{ name: 'settings' }"
					>
						<div class="flex items-center gap-2">
							<IconEdit size="sm" />
							<span>Edit</span>
						</div>
					</BaseButton>
					<div v-else class="flex items-center justify-center">
						<div v-if="isPartner">
							<BaseButton
								id="removePartnerBtn"
								mode="warn"
								@click="removePartner"
								>Remove partner</BaseButton
							>
						</div>
						<p v-else-if="isRequestSent" class="bold italic">
							Request Sent
						</p>
						<BaseButton v-else mode="cta" @click="sendRequest">
							<div class="flex items-center gap-2">
								<IconPlus size="sm" />
								<span>Add as partner</span>
							</div>
						</BaseButton>
					</div>
				</div>
			</div>
			<div>
				<div class="grid sm:grid-cols-2 gap-3">
					<div
						v-if="user.countryCode"
						v-tooltip.top="`From ${country.name}`"
						class="
							flex
							items-center
							justify-center
							sm:justify-end
							gap-2
							p-2
							rounded-lg
							text-red-600
						"
					>
						<span>{{ country.name }}</span>
						<div
							class="
								w-6
								h-6
								rounded-full
								flex
								items-center
								justify-center
								overflow-hidden
							"
						>
							<img
								:src="country.flag"
								alt="Flag"
								class="object-cover h-full"
							/>
						</div>
					</div>
					<div
						v-tooltip.top="'Age'"
						class="
							flex
							items-center
							justify-center
							sm:justify-start
							gap-2
							text-orange-600
							p-2
							rounded-lg
						"
					>
						<IconCake class="text-orange-600" />
						<span>{{ age }}</span>
					</div>
					<div
						v-tooltip.bottom="'Joined on'"
						class="
							flex
							items-center
							justify-center
							sm:justify-end
							gap-2
							text-blue-600
							p-2
							rounded-lg
						"
					>
						<span>{{ joinDate }}</span>
						<IconCalendar class="text-blue-600" />
					</div>
					<div
						v-tooltip.bottom="'Occupation'"
						class="
							flex
							items-center
							justify-center
							sm:justify-start
							gap-2
							text-indigo-600
							p-2
							rounded-lg
						"
					>
						<IconIdentification class="text-indigo-600" />
						<span>{{ user.occupation || 'No occupation' }}</span>
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
import IconEdit from 'icons/IconEdit.vue';
import IconPlus from 'icons/IconPlus.vue';
import IconCalendar from 'icons/IconCalendar.vue';
import IconCake from 'icons/IconCake.vue';
import IconIdentification from 'icons/IconIdentification.vue';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { mapActions, mapGetters } from 'vuex';
import * as fb from '@/firebase';

export default {
	components: {
		BaseAvatar,
		BaseContainer,
		BaseButton,
		IconEdit,
		IconPlus,
		IconCalendar,
		IconCake,
		IconIdentification,
	},
	props: ['user', 'isLoggedIn'],
	computed: {
		...mapGetters([
			'currentUserId',
			'getCurrentUserSentRequests',
			'currentUser',
		]),
		...mapGetters('users', ['getUserById']),
		...mapGetters('partners', ['getPartnersById']),
		...mapGetters('todos', ['currentUserTodos']),
		isRequestSent() {
			return this.getCurrentUserSentRequests.includes(this.user.username);
		},
		isPartner() {
			return this.getPartnersById(this.currentUserId)
				.map((user) => user.username)
				.includes(this.user.username);
		},
		age() {
			if (this.user.birthday) {
				const birthday = dayjs.unix(this.user.birthday.seconds);
				return dayjs().diff(birthday, 'year') + ' years old';
			}
			return 'No birthday date.';
		},
		joinDate() {
			dayjs.extend(advancedFormat);
			const date = dayjs.unix(this.user.joined_on.seconds);
			return date.format('MMM Do, YYYY');
		},
		country() {
			const countryCode = this.user.countryCode;

			const { name, flag } =
				this.$store.getters.getCountryByCode(countryCode);
			const countryName = name.length <= 12 ? name : countryCode;

			return { name: countryName, flag };
		},
	},
	methods: {
		...mapActions('notifications', ['sendPartnerRequest']),
		sendRequest() {
			this.sendPartnerRequest({ partner: this.user.username });
		},
		async removePartner() {
			const sharedTodos = this.currentUserTodos.filter(
				(todo) => todo.partner === this.user.username
			);

			const filteredUser = this.currentUser.partners.filter((p) => {
				return p !== this.user.username;
			});

			await fb.usersCollection.doc(this.currentUserId).update({
				partners: filteredUser,
			});

			for (const todo of sharedTodos) {
				await fb.usersCollection
					.doc(this.currentUserId)
					.collection('todos')
					.doc(todo.id)
					.delete();
			}

			const filteredPartner = this.getUserById(
				this.user.username
			).partners.filter((p) => {
				return p !== this.currentUserId;
			});

			await fb.usersCollection.doc(this.user.username).update({
				partners: filteredPartner,
			});
		},
	},
};
</script>

<style scoped>
#removePartnerBtn {
	transform: scale(0.85, 0.85);
	padding: 11px;
}
</style>
