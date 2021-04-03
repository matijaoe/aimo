<template>
	<footer
		class="hidden sm:block fixed bottom-0 left-0 z-20 w-full px-2 md:px-8 pt-0.5 pb-1 text-xs text-blue-100 bg-blue-500"
	>
		<div class="flex items-center justify-between">
			<div class="flex-1">
				<span>2 todos done</span>
				<span> / </span>
				<span>4 todos left</span>
			</div>
			<div class="flex-1 text-center cursor-pointer hidden lg:block">
				<!-- Home {{ $route.path }} -->
				Home
			</div>
			<div class="flex items-center justify-end flex-1 gap-4 text-right">
				<p class="flex items-center gap-1">
					<IconCalendar />
					<span id="date">
						{{ currentDate }}
					</span>
				</p>
				<p class="flex items-center gap-1">
					<IconClock />
					<span id="clock" class="text-left w-[40px]">
						{{ currentTime }}
					</span>
				</p>
			</div>
		</div>
	</footer>
</template>

<script>
import IconClock from 'icons/IconClock.vue';
import IconCalendar from 'icons/IconCalendar.vue';

import dayjs from 'dayjs';

export default {
	components: {
		IconClock,
		IconCalendar,
	},
	data() {
		return {
			intervalId: null,
			currentTime: null,
			currentDate: null,
		};
	},
	computed: {},
	mounted() {
		this.startTimeAndDate();
	},
	methods: {
		startTimeAndDate() {
			if (this.intervalId) {
				clearInterval(this.intervalId);
			}

			this.setTimeAndDate();
			setInterval(this.setTimeAndDate, 1000);
		},
		setTimeAndDate() {
			const now = dayjs();
			// https://day.js.org/docs/en/display/format
			this.currentDate = now.format('dddd, MMMM DD');
			this.currentTime = now.format('HH:mm:ss');
		},
	},
};
</script>
