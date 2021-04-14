<template>
	<!-- Main grid with 3 cols -->
	<div class="grid grid-cols-3 gap-4">
		<!-- Column 1 -->
		<div>
			<BaseContainer>
				<div class="flex flex-col gap-8">
					<div class="flex flex-col items-center gap-2">
						<div
							class="p-1 border-[4px] border-amber-400 rounded-full mb-2"
						>
							<BaseAvatar size="xxl" />
						</div>
						<div
							class="flex flex-col justify-center items-center gap-4"
						>
							<div class="flex flex-col items-center gap-1">
								<p class="font-bold text-xl">Matija Osrečki</p>
								<p class="opacity-70 text-sm">@matijao</p>
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
								<span>Croatia</span>
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
								<span>21 yo</span>
							</div>
							<div
								v-tooltip.left="'Joined on'"
								class="flex items-center gap-2 justify-self-end text-blue-500 py-2 px-4 rounded-lg bg-blue-50"
							>
								<span>July 2021</span>
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
		</div>

		<!-- lumn 2 -->
		<div class="flex flex-col gap-4 -mt-1">
			<div class="-mt-1 flex flex-col gap-2 col-span-1">
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
						<BaseBrandIcon />
					</div>
				</BaseContainer>

				<BaseContainer fieldset label="Partners">
					<div class="grid grid-cols-7 gap-2">
						<div v-for="n in 7" :key="n">
							<BaseAvatar />
						</div>
					</div>
				</BaseContainer>
			</div>
			<BaseContainer fieldset label="Bio" class="flex-1">
				<p>Different strokes for different folkes</p>
			</BaseContainer>
			<!-- <BaseContainer class="row-span-2" fieldset label="Goals">
				<ul>
					<li>Get that bread</li>
					<li>Get that cheese</li>
				</ul>
			</BaseContainer> -->
		</div>
		<!-- Column 3 - notifications-->
		<div class="-mt-1 max-h-screen">
			<BaseContainer fieldset label="Notifications">
				<p class="mb-3 px-5 font-semibold">
					You have
					<span
						class="font-bold mx-1 text-amber-500 text-base transition p-2 bg-amber-100 w-9 h-9 inline-grid rounded-full place-content-center"
					>
						{{ notifyCount }}
					</span>
					new notifications
				</p>
				<ul class="space-y-2">
					<li
						v-for="notification in notifications"
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
// import IconDollar from 'icons/IconDollar.vue';
import IconCake from 'icons/IconCake.vue';
import IconAcademicHat from 'icons/IconAcademicHat.vue';

export default {
	components: {
		BaseAvatar,
		BaseBrandIcon,
		BaseContainer,
		BaseButton,
		IconLocation,
		IconEdit,
		IconCalendar,
		// IconDollar,
		IconCake,
		IconAcademicHat,
	},
	layout: 'default_no_header',
	data() {
		return {
			notifications: [
				'Matija gave you recognition',
				'Zoki commented on your post',
				'Patrik beat your streak',
				'Lorena loves you and takes care of you',
			],
		};
	},
	computed: {
		notifyCount() {
			return this.notifications.length;
		},
	},
};
</script>
