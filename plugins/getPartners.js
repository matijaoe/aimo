export default async ({ store }) => {
	await store.dispatch('partners/loadPartnersData');
};
