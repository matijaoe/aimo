<template>
	<section
		v-if="currentUser"
		class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4"
	>
		<div
			class="
				md:col-span-2
				lg:col-span-3
				bg-[#F4F4F4]
				text-[#4D61FC]
				rounded-2xl
				flex
				items-center
				pl-[10%]
			"
		>
			<h2 class="flex-1 space-y-10 py-20 md:py-0">
				<div
					class="
						text-base
						xs:text-xl
						sm:text-3xl
						md:text-xl
						lg:text-2xl
						xl:text-4xl
						font-bold
					"
				>
					<span id="welcome" class="text-[#4D61FC]"
						>Welcome back</span
					>
					<span
						id="welcomeUser"
						class="
							bg-[#B8C0FE]
							text-[#4D61FC]
							px-5
							py-2
							rounded-lg
							ml-2
						"
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
			class="
				flex
				items-center
				p-12
				bg-orange-100
				text-orange-800
				rounded-2xl
			"
		>
			<BaseQuote />
		</div>

		<div
			class="flex items-center p-12 bg-blue-100 text-blue-800 rounded-2xl"
		>
			<BaseQuote />
		</div>

		<div
			class="
				flex
				items-center
				p-12
				bg-emerald-100
				text-emerald-800
				rounded-2xl
			"
		>
			<BaseQuote />
		</div>

		<BaseContainer
			v-if="finishedCount !== 0 || approvedCount !== 0 || leftCount !== 0"
			id="chart"
		>
			<BaseDoughnutChart
				ref="skills_chart"
				:chart-data="chartData"
				:options="options"
				:todos="[finishedCount, approvedCount, leftCount]"
				class="w-full h-auto"
			>
			</BaseDoughnutChart>
		</BaseContainer>

		<div
			class="
				flex flex-col
				justify-center
				flex-wrap
				items-center
				p-12
				bg-rose-100
				text-rose-800
				rounded-2xl
			"
		>
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
	</section>
</template>

<script>
import BaseQuote from 'UI/BaseQuote.vue';
import BaseContainer from 'UI/BaseContainer.vue';
import BaseDoughnutChart from 'UI/BaseDoughnutChart.vue';
import IconClipboardCheck from 'icons/IconClipboardCheck.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		BaseQuote,
		IconClipboardCheck,
		BaseDoughnutChart,
		BaseContainer,
	},
	data() {
		return {
			randomGeneratedTodo: '',
			options: {
				title: {
					display: false,
					text: 'Your todo stats',
					position: 'bottom',
				},
				responsive: true,
				maintainAspectRatio: false,
				animation: {
					animateRotate: false,
				},
				legend: {
					display: true,
					labels: {
						fontFamily: ['Poppins', 'ui-sans-serif'],
					},
				},
			},
			chartData: {
				labels: ['Finished', 'Approved', 'Left'],
				datasets: [
					{
						backgroundColor: ['#93C5FD', '#6EE7B7', '#FCA5A5'],
						data: [],
						weight: 10,
					},
				],
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

@media screen and (max-width: 1405px) and (min-width: 1280px) {
	#welcome {
		position: absolute;
	}

	#welcomeUser {
		position: relative;
		top: 60px;
		right: 7px;
	}
}

@media screen and (max-width: 735px) {
	#chart {
		display: none;
	}
}
</style>
