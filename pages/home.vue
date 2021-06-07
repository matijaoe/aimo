<template>
	<section
		v-if="currentUser"
		class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4"
	>
		<div
			class="md:col-span-2 lg:col-span-3 bg-[#F4F4F4] text-[#4D61FC] rounded-2xl flex items-center pl-[10%]"
		>
			<h2 class="flex-1 space-y-10 py-20 md:py-0">
				<div
					class="text-base xs:text-xl sm:text-3xl md:text-xl lg:text-2xl xl:text-4xl font-bold"
				>
					<span id="welcome" class="text-[#4D61FC]"
						>Welcome back</span
					>
					<span
						id="welcomeUser"
						class="bg-[#B8C0FE] text-[#4D61FC] px-5 py-2 rounded-lg ml-2"
						>{{ currentUser.fname }}!</span
					>
				</div>
			</h2>
			<div id="vector-illustration" class="flex-1 hidden md:flex">
				<img
					src="~assets/img/hero.svg"
					alt="illustration"
					class="ml-auto max-h-[350px]"
				/>
			</div>
		</div>

		<div
			class="flex items-center p-12 bg-orange-100 text-orange-800 rounded-2xl"
		>
			<BaseQuote />
		</div>

		<div
			id="chart"
			class="pt-6 pb-1 pr-8 pl-1 bg-blue-100 text-blue-800 rounded-2xl"
		>
			<apexchart
				id="apexchart"
				type="bar"
				height="310"
				:options="chartOptions"
				:series="[
					{
						name: 'Number of todos',
						data: [finishedCount, approvedCount, leftCount],
					},
				]"
			></apexchart>
		</div>

		<div class="flex items-center bg-rose-100 text-rose-800 rounded-2xl">
			<div class="flex flex-col items-center p-12">
				<div class="flex flex-row gap-1">
					<div id="checkIcon">
						<IconClipboardCheck />
					</div>
					<p class="uppercase pt-2 relative bottom-1">
						Recommended todo:
					</p>
				</div>

				<h2 class="text-xl font-bold p-1">
					{{ randomGeneratedTodo }}
				</h2>
			</div>
		</div>
	</section>
</template>

<script>
import BaseQuote from 'UI/BaseQuote.vue';
import { mapGetters } from 'vuex';
import VueApexCharts from 'vue-apexcharts';
import IconClipboardCheck from '../components/app_icons/IconClipboardCheck.vue';

export default {
	components: { BaseQuote, IconClipboardCheck, apexchart: VueApexCharts },
	data() {
		return {
			randomGeneratedTodo: '',
			series: [],
			chartOptions: {
				chart: {
					height: 40,
					type: 'bar',
				},
				plotOptions: {
					bar: {
						borderRadius: 10,
						dataLabels: {
							position: 'top', // top, center, bottom
						},
					},
				},
				dataLabels: {
					enabled: true,
					formatter(val) {
						return val;
					},
					offsetY: -20,
					style: {
						fontSize: '12px',
						colors: ['#4064ff'],
					},
				},

				xaxis: {
					categories: ['Done', 'Approved', 'Left'],
					position: 'top',
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					crosshairs: {
						fill: {
							type: 'gradient',
							gradient: {
								colorFrom: '#4064ff',
								colorTo: '#4064ff',
								stops: [0, 100],
								opacityFrom: 0.4,
								opacityTo: 0.5,
							},
						},
					},
					tooltip: {
						enabled: false,
					},
				},
				yaxis: {
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					labels: {
						show: false,
						formatter(val) {
							return val;
						},
					},
				},
				title: {
					text: 'Your todos status',
					floating: true,
					offsetY: 292,
					align: 'center',
					style: {
						color: '#4064ff',
					},
				},
			},
		};
	},
	computed: {
		...mapGetters(['getRandomRecommendedTodo']),
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
		currentUser() {
			return this.$store.getters.currentUser;
		},
	},
	created() {
		this.randomGeneratedTodo = this.getRandomRecommendedTodo;
	},
};
</script>

<style scoped>
#vector-illuistration {
	background-image: url('~assets/img/hero.svg');
}

@media screen and (max-width: 1380px) and (min-width: 1280px) {
	#welcome {
		position: absolute;
	}

	#welcomeUser {
		position: relative;
		top: 60px;
		right: 7px;
	}
}
</style>
