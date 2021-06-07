<template>
	<div>
		<h2 id="quote" class="text-xl font-bold">
			{{ quoteText }}
		</h2>
		<p id="author" class="uppercase pt-3 text-right">
			{{ quoteAuthor }}
		</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			quoteText: '',
			quoteAuthor: '',
		};
	},
	created() {
		fetch('https://quotable.io/random')
			.then((res) => res.json())
			.then((data) => {
				this.quoteText = data.content;
				this.quoteAuthor = data.author;
			});
	},
};
</script>
