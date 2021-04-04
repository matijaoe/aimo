<template>
	<footer
		class="hidden sm:block fixed bottom-0 left-0 z-20 w-full px-2 md:px-8 pt-0.5 pb-1 text-xs text-blue-100 bg-blue-500"
	>
		<div class="flex items-center justify-between">
			<div class="flex-1 space-x-2">
				<span>2 todos done</span>
				<span>/</span>
				<span>4 todos left</span>
			</div>
			<div
				class="flex-1 text-center cursor-pointer hidden lg:block space-x-2"
			>
				<!-- Home {{ $route.path }} -->
				<a href="https://github.com/mat2ja/aimo" target="_blank">
					Github Repo
				</a>
				<span>/</span>
				<a href="https://aimo.vercel.app/" target="_blank">Live Demo</a>
			</div>
			<div class="flex items-center justify-end flex-1 gap-4 text-right">
				<p
					v-tooltip.bottom="fullDateStatus"
					class="flex items-center gap-1 cursor-default"
				>
					<IconCalendar />
					<span id="date">
						{{ currentDate }}
					</span>
				</p>
				<p class="flex items-center gap-1 cursor-default">
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
import advancedFormat from 'dayjs/plugin/advancedFormat';

export default {
	components: {
		IconClock,
		IconCalendar,
	},
	data() {
		return {
			intervalId: null,
			now: dayjs(),
		};
	},
	computed: {
		// https://day.js.org/docs/en/display/format
		currentDate() {
			dayjs.extend(advancedFormat);
			return this.now.format('dddd, MMMM Do');
		},
		currentTime() {
			return this.now.format('HH:mm:ss');
		},
		fullDateStatus() {
			const day = this.now.format('dddd');
			const date = this.now.format('MMMM DD, YYYY');
			return `It's a beautiful ${day}, ${date}`;
		},
		currentFullTime() {
			return this.now.format('HH:mm:ss');
		},
	},
	mounted() {
		this.startTimeAndDate();
	},
	methods: {
		startTimeAndDate() {
			if (this.intervalId) {
				clearInterval(this.intervalId);
			}
			setInterval(this.setTimeAndDate, 1000);
		},
		setTimeAndDate() {
			this.now = dayjs();
		},
	},
};
</script>
