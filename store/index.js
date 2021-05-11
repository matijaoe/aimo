import * as fb from '@/firebase';

export const state = () => ({
	userId: 'matijao',
	categories: [],
	state: [],
	searchResults: {},
});

export const getters = {
	currentUserId(state) {
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
	getCategoryIdByName: (state, getters) => (tagName) => {
		return getters.categories.find((cat) => cat.name === tagName).id;
	},
	socials(state) {
		return state.socials;
	},
	getSocialById: (state, getters) => (socId) => {
		return getters.socials.find((cat) => cat.id === socId);
	},
	getSearchResults(state) {
		return state.searchResults;
	},
};

export const mutations = {
	loadCategoriesData(state, collectionsData) {
		state.categories = collectionsData;
	},
	loadSocialsData(state, socialsData) {
		state.socials = socialsData;
	},
	searchAnything(state, results) {
		state.searchResults = results;
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
		} catch (error) {}
	},
	async loadSocialsData({ commit }) {
		try {
			const socials = await fb.socialsCollection.get();

			const socialsData = [];
			for (const doc of socials.docs) {
				socialsData.push({ ...doc.data(), id: doc.id });
			}

			commit('loadSocialsData', socialsData);
		} catch (error) {}
	},
	async searchAnything({ commit, getters, rootGetters }, term) {
		const limit = 4;
		term = term.toLowerCase();
		if (term.replace(/\s+/g, '') === '') {
			commit('searchAnything', {});
			return;
		}
		try {
			const foundTodos = [];
			const todosRef = await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.get();
			const filteredTodos = todosRef.docs.filter((p) =>
				p.data().name.toLowerCase().includes(term)
			);
			for (const doc of filteredTodos) {
				if (foundTodos.length === limit) {
					break;
				}
				foundTodos.push(doc.data());
			}

			const foundUsers = [];
			const userRef = await fb.usersCollection.get();
			const filteredUsers = userRef.docs.filter(
				(p) =>
					p.data().fname.toLowerCase().includes(term) ||
					p.data().lname.toLowerCase().includes(term) ||
					p.id.toLowerCase().includes(term)
			);
			for (const doc of filteredUsers) {
				if (foundUsers.length === limit) {
					break;
				}
				foundUsers.push({ ...doc.data(), id: doc.id });
			}

			const foundCategories = [];
			const categoriesRef = await fb.categoriesCollection.get();
			const filteredCategories = categoriesRef.docs.filter((p) =>
				p.data().name.toLowerCase().includes(term)
			);
			for (const doc of filteredCategories) {
				if (foundCategories.length === limit) {
					break;
				}
				foundCategories.push(doc.data());
			}

			const results = {
				users: foundUsers,
				todos: foundTodos,
				categories: foundCategories,
			};
			commit('searchAnything', results);
		} catch (error) {
			console.log(error);
		}
	},
};
