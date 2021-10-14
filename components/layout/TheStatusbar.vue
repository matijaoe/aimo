<template>
	<footer
		class="
			fixed
			bottom-0
			left-0
			z-20
			w-full
			px-4
			md:px-8
			pt-1
			pb-1
			text-xs text-blue-100
			bg-blue-500
			select-none
		"
	>
		<div class="flex items-center justify-between">
			<div class="flex-1 space-x-3 flex items-center">
				<div
					v-tooltip.top="`${finishedCount} todos done`"
					class="flex items-center gap-1"
				>
					{{ finishedCount }}
					<IconCheckCircle size="sm" />
				</div>
				<div
					v-tooltip.top="`${approvedCount} todos approved`"
					class="flex items-center gap-1"
				>
					{{ approvedCount }}
					<IconBadgeCheck size="sm" />
				</div>
				<div
					v-tooltip.top="`${leftCount} todos left`"
					class="flex items-center gap-1"
				>
					{{ leftCount }}
					<IconXCircle size="sm" />
				</div>
			</div>
			<div class="flex-1 text-center cursor-pointer hidden lg:block">
				<span>{{ $route.path }} </span>
			</div>
			<div class="flex items-center justify-end flex-1 gap-4 text-right">
				<p
					v-tooltip.bottom="fullDateStatus"
					class="flex items-center gap-1 cursor-default"
				>
					<IconCalendar size="sm" />
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
import IconCheckCircle from 'icons/IconCheckCircle.vue';
import IconBadgeCheck from 'icons/IconBadgeCheck.vue';
import IconXCircle from 'icons/IconXCircle.vue';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { mapGetters } from 'vuex';

export default {
	components: {
		IconClock,
		IconCalendar,
		IconCheckCircle,
		IconBadgeCheck,
		IconXCircle,
	},
	data() {
		return {
			intervalId: null,
			now: dayjs(),
		};
	},
	computed: {
		...mapGetters('todos', ['currentUserTodos']),
		finishedCount() {
			return this.currentUserTodos.filter((todo) => todo.done).length;
		},
		approvedCount() {
			return this.currentUserTodos.filter((todo) => todo.approved).length;
		},
		leftCount() {
			return this.currentUserTodos.filter((todo) => !todo.done).length;
		},
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
