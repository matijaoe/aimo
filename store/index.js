import * as fb from '@/firebase';

export const state = () => ({
	userId: 'matijao',
});

export const getters = {
	currentUserId(state) {
		// primjer koda za DODAVANJE socials-a u bazu (na isti nacin i categories, etc.)
		// warning: ne izvrsavati zakomentirani kod ako je nepotrebno, jer ce napraviti dupliće u bazi

		// for (const social of state.socials) {
		// 	db.collection('socials')
		// 		.doc()
		// 		.set({
		// 			name: social.name,
		// 		})
		// 		.then(() => {
		// 			console.log('Document successfully written!');
		// 		})
		// 		.catch((error) => {
		// 			console.error('Error writing document: ', error);
		// 		});
		// }
		return state.userId;
	},
	currentUser(state, getters) {
		return getters['users/getUserById'](getters.currentUserId);
	},
	currentUserPartners(state, getters) {
		return getters['partners/getPartnersById'](getters.currentUserId) || [];
	},
	categories(state) {
		return state.categories;
	},
	getCategoryById: (state, getters) => (catId) => {
		return getters.categories.find((cat) => cat.id === catId);
	},
	socials(state) {
		return state.socials;
	},
	getSocialById: (state, getters) => (socId) => {
		return getters.socials.find((cat) => cat.id === socId);
	},
};

export const mutations = {
	loadCategoriesData(state, collectionsData) {
		state.categories = collectionsData;
	},
	loadSocialsData(state, socialsData) {
		state.socials = socialsData;
	},
};

export const actions = {
	async loadCategoriesData({ commit }) {
		try {
			const categories = await fb.categoriesCollection.get();

			const collectionsData = [];
			for (const doc of categories.docs) {
				collectionsData.push({ ...doc.data(), id: doc.id });
			}

			commit('loadCategoriesData', collectionsData);
		} catch (error) {
			console.error(error);
		}
	},
	async loadSocialsData({ commit }) {
		try {
			const socials = await fb.socialsCollection.get();

			const socialsData = [];
			for (const doc of socials.docs) {
				socialsData.push({ ...doc.data(), id: doc.id });
			}

			commit('loadSocialsData', socialsData);
		} catch (error) {
			console.error(error);
		}
	},
};
