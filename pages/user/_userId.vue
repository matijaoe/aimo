<template>
	<!-- Main grid with 3 cols -->
	<div class="grid grid-cols-3 gap-4 h-full">
		<!-- Column 1 -->
		<div class="flex flex-col gap-2">
			<BaseContainer fieldset label="Info">
				<div class="flex flex-col gap-8">
					<div class="flex flex-col items-center gap-2">
						<div
							class="p-1 border-[4px] border-amber-400 rounded-full mb-2"
						>
							<BaseAvatar size="xxl" :src="userInfo.photo" />
						</div>
						<div
							class="flex flex-col justify-center items-center gap-4"
						>
							<div class="flex flex-col items-center gap-1">
								<p class="font-bold text-xl">
									{{ userInfo.fname + ' ' + userInfo.lname }}
								</p>
								<p class="opacity-70 text-sm">
									@{{ userInfo.username }}
								</p>
							</div>
							<BaseButton mode="fill">
								<div class="flex items-center gap-2">
									<IconEdit size="sm" />
									<span>Edit</span>
								</div>
							</BaseButton>
							<!-- <BaseButton mode="cta">
								<div class="flex items-center gap-2">
									<IconEdit size="sm" />
									<span>Message</span>
								</div>
							</BaseButton> -->
						</div>
					</div>
					<div>
						<div class="grid grid-cols-2 gap-4 mx-2 font-medium">
							<div
								v-tooltip.left="'Country'"
								class="flex items-center gap-2 justify-self-end text-green-500 py-2 px-4 rounded-lg bg-green-50"
							>
								<span>{{ userInfo.country }}</span>
								<IconLocation
									size="sm"
									class="text-green-500"
								/>
							</div>
							<div
								v-tooltip.right="'Age'"
								class="flex items-center gap-2 justify-self-start text-orange-500 py-2 px-4 rounded-lg bg-orange-50"
							>
								<IconCake size="sm" class="text-orange-500" />
								<span>{{ userInfo.age }} yo</span>
							</div>
							<div
								v-tooltip.left="'Joined on'"
								class="flex items-center gap-2 justify-self-end text-blue-500 py-2 px-4 rounded-lg bg-blue-50"
							>
								<!-- inace ce tu ic metoda koje izvuce datum iz timestampa -->
								<span>{{ userInfo.joined_on }}</span>
								<IconCalendar size="sm" class="text-blue-500" />
							</div>
							<div
								v-tooltip.right="'Occupation'"
								class="flex items-center gap-2 justify-self-start text-purple-500 py-2 px-4 rounded-lg bg-purple-50"
							>
								<IconAcademicHat
									size="sm"
									class="text-purple-500"
								/>
								<span>Student</span>
							</div>
						</div>
					</div>
					<!-- <div
					class="grid grid-cols-2 gap-4 mx-2 text-sm place-items-center"
				>
					<div
						v-tooltip.bottom="'Coins'"
						class="flex items-center gap-1"
					>
						<IconDollar size="sm" class="text-amber-400" />
						<span>450</span>
					</div>
				</div> -->
				</div>
			</BaseContainer>
			<BaseContainer
				fieldset
				label="Coins"
				class="border-amber-300 bg-amber-100 text-amber-500"
			>
				<p class="font-bold font-lg">
					<span class="font-extrabold text-5xl">
						{{ userInfo.coins }}
					</span>
					<span
						class="transform -rotate-6 -translate-y-2 inline-block"
					>
						coineroos
					</span>
					<span
						class="font-lg transform rotate-6 -translate-y-2 inline-block"
					>
						earned
					</span>
					<span
						class="font-lg transform -rotate-6 -translate-y-2 inline-block"
					>
						the
					</span>
					<span
						class="font-lg transform rotate-6 -translate-y-2 inline-block"
					>
						past
					</span>
					<span
						class="font-lg transform -rotate-6 -translate-y-2 inline-block"
					>
						month
					</span>
				</p>
			</BaseContainer>
		</div>

		<!-- Column 2 -->
		<div class="flex flex-col gap-2">
			<BaseContainer fieldset label="Socials">
				<div class="grid grid-cols-7 gap-2">
					<BaseBrandIcon brand="twitter" href="#" />
					<BaseBrandIcon brand="facebook" href="#" />
					<BaseBrandIcon brand="instagram" href="#" />
					<BaseBrandIcon brand="youtube" href="#" />
					<BaseBrandIcon brand="linkedin" href="#" />
					<BaseBrandIcon brand="discord" href="#" />
					<BaseBrandIcon brand="telegram" href="#" />
					<BaseBrandIcon brand="slack" href="#" />
					<BaseBrandIcon brand="reddit" href="#" />
					<BaseBrandIcon brand="tumblr" href="#" />
					<BaseBrandIcon brand="pinterest" href="#" />
					<BaseBrandIcon brand="github" href="#" />
					<BaseBrandIcon brand="codepen" href="#" />
					<BaseBrandIcon brand="dribbble" href="#" />
					<BaseBrandIcon brand="behance" href="#" />
					<BaseBrandIcon brand="stack-overflow" href="#" />
					<BaseBrandIcon brand="medium" href="#" />
					<BaseBrandIcon brand="behance" href="#" />
					<BaseBrandIcon brand="unsplash" href="#" />
					<BaseBrandIcon brand="whatsapp" href="#" />
					<BaseBrandIcon brand="messenger" href="#" />
					<BaseBrandIcon brand="quora" href="#" />
					<BaseBrandIcon brand="patreon" href="#" />
					<BaseBrandIcon brand="bitcoin" href="#" />
					<!-- radi i ako ne prepozna brand -->
					<BaseBrandIcon brand="fsd" href="#" />
					<!-- radi i bez propsa -->
					<!-- <BaseBrandIcon /> -->
				</div>
			</BaseContainer>

			<BaseContainer fieldset label="Partners">
				<div class="grid grid-cols-7 gap-2">
					<div v-for="n in 7" :key="n">
						<BaseAvatar />
					</div>
				</div>
			</BaseContainer>
			<BaseContainer fieldset label="Bio">
				<p>{{ userInfo.bio }}</p>
			</BaseContainer>
		</div>

		<!-- Column 3 -->
		<div class="h-full">
			<BaseContainer fieldset label="Notifications">
				<p class="mb-3 px-5 font-semibold">
					You have
					<span
						class="font-bold mx-1 text-amber-500 text-base transition p-2 bg-amber-100 w-9 h-9 inline-grid rounded-full place-content-center"
					>
						{{ userInfo.notifications.length }}
					</span>
					new notifications
				</p>
				<ul class="space-y-2">
					<li
						v-for="notification in userInfo.notifications"
						:key="notification"
						class="py-3 px-5 bg-gray-50 rounded-lg"
					>
						{{ notification }}
					</li>
				</ul>
			</BaseContainer>
		</div>
	</div>
</template>

<script>
import BaseAvatar from 'UI/BaseAvatar.vue';
import BaseBrandIcon from 'UI/BaseBrandIcon.vue';
import BaseContainer from 'UI/BaseContainer.vue';
import BaseButton from 'UI/BaseButton.vue';
import IconLocation from 'icons/IconLocation.vue';
import IconEdit from 'icons/IconEdit.vue';
import IconCalendar from 'icons/IconCalendar.vue';
import IconCake from 'icons/IconCake.vue';
import IconAcademicHat from 'icons/IconAcademicHat.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseAvatar,
		BaseBrandIcon,
		BaseContainer,
		BaseButton,
		IconLocation,
		IconEdit,
		IconCalendar,
		IconCake,
		IconAcademicHat,
	},
	data() {
		return {
			userId: this.$route.params.userId,
			userExists: true,
		};
	},
	computed: {
		...mapGetters('users', ['users']),
		userInfo() {
			// if (!this.userId) {
			// 	this.$router.push({
			// 		path: '/user/404',
			// 	});
			// }

			// todo reusable getUserById -> mixin OR hook with compositionAPI
			const user = this.users.find(
				(user) => user.username === this.userId
			);

			// if (!user) {
			// 	this.$router.push({
			// 		path: '/user/404',
			// 	});
			// }

			return user;
		},
	},
};
</script>
