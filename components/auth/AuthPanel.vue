<template>
	<BaseContainer class="auth-card md:w-full" no-padding>
		<div class="md:grid grid-cols-5 h-full px-10 md:px-0">
			<div class="hidden md:block form-bg col-span-3" />

			<div class="py-4 flex flex-col items-center md:col-span-2">
				<div class="p-6 mb-6">
					<SidebarLogo />
				</div>
				<AuthForm />
			</div>
		</div>
	</BaseContainer>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm.vue';
import BaseContainer from 'UI/BaseContainer.vue';
import SidebarLogo from 'menus/SidebarLogo.vue';

export default {
	components: {
		AuthForm,
		BaseContainer,
		SidebarLogo,
	},
};
</script>

<style scoped>
.auth-card {
	max-height: 400px;
	height: 80%;
	max-width: 1000px;
	margin: 0 1rem;
	overflow: hidden;
}
.form-bg {
	background-image: url('~assets/img/accountability-partner.jpg');
	background-position: center;
	background-size: cover;
}
</style>
