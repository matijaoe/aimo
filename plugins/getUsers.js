export default async ({ store }) => {
	await store.dispatch('users/loadUserData');
};
