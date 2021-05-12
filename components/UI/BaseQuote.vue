<template>
	<div>
		<h2 id="quote" class="text-xl text-blue-900 font-bold">
			{{ quoteText }}
		</h2>
		<p id="author" class="uppercase pt-2 text-blue-900 text-right">
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
		fetch('http://quotable.io/random')
			.then((res) => res.json())
			.then((data) => {
				this.quoteText = data.content;
				this.quoteAuthor = data.author;
			});
	},
};
</script>
