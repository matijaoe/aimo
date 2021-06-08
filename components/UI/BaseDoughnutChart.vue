<script>
import { Doughnut } from 'vue-chartjs';

export default {
	extends: Doughnut,
	props: ['chartData', 'options', 'todos'],
	mounted() {
		const customized = this.chartData;
		customized.datasets[0].data = this.todos;
		this.renderChart(customized, this.options);
	},
	methods: {
		update() {
			this.$data._chart.update();
		},
	},
};
</script>
