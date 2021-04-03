<template>
	<div class="container">
		<div>
			<Logo />
			<div class="mt-4 font-logo text-xl">
				<h2 class="bg-gray-300 py-2">AIMO</h2>
				<h2 class="bg-coolGray-300 py-2">AIMO</h2>
				<h2 class="bg-yellow-300 py-2">AIMO</h2>
				<h2 class="bg-amber-300 py-2">AIMO</h2>
				<h2 class="bg-orange-300 py-2">AIMO</h2>
				<h2 class="bg-red-300 py-2">AIMO</h2>
				<h2 class="bg-blue-300 py-2">AIMO</h2>
				<h2 class="bg-lightBlue-300 py-2">AIMO</h2>
				<h2 class="bg-indigo-300 py-2">AIMO</h2>
				<h2 class="bg-purple-300 py-2">AIMO</h2>
				<h2 class="bg-pink-300 py-2">AIMO</h2>
				<h2 class="bg-green-300 py-2">AIMO</h2>
				<h2 class="bg-emerald-300 py-2">AIMO</h2>
				<h2 class="bg-teal-300 py-2">AIMO</h2>
			</div>
			<div class="links">
				<a
					href="https://nuxtjs.org/"
					target="_blank"
					rel="noopener noreferrer"
					class="button--green"
				>
					Documentation
				</a>
				<a
					href="https://github.com/nuxt/nuxt.js"
					target="_blank"
					rel="noopener noreferrer"
					class="button--grey"
				>
					GitHub
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
	components: { Logo },
};
</script>

<style>
.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	/* font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
		BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
		sans-serif; */
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.links {
	padding-top: 15px;
}
</style>
