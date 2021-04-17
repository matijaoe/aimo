<template>
	<div>
		<h2 class="text-lg font-bold">{{ dateFormatted }}</h2>
	</div>
</template>

<script>
export default {
	props: {
		date: {
			type: Date,
			required: true,
		},
	},
	computed: {
		dateFormatted() {
			const date = this.date;
			const mo = date.toLocaleString('en', { month: 'short' });
			const h =
				date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
			const min =
				date.getMinutes() < 10
					? '0' + date.getMinutes()
					: date.getMinutes();
			return `${mo} ${date.getDate()}, ${date.getFullYear()} - ${h}:${min}`;
		},
	},
};
</script>
