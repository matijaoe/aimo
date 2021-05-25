import * as fb from '@/firebase';
import axios from 'axios';

export const state = () => ({
	user: null,
	userId: '',
	uid: '',
	categories: [],
	state: [],
	countries: [],
	searchResults: {},
	randomRecommendedTodos: [
		'Meditate every morning.',
		'Stay offline one day per week.',
		'Read 20 pages per day.',
		'Journal every day.',
		'Get up when your alarm goes off.',
		'Limit screen time after work.',
		'Take a ‘me’ day.',
		'Walk after lunch or dinner. ',
		'Eat more veggies.',
		'Develop a workout routine.',
		'Drink more water.',
		'Go to bed at a reasonable time.',
		'Explore two new places.',
		'Get out into nature.',
		'Volunteer.',
		'Smile more.',
		'Write a poem.',
		'Be a better listener.',
		'Help a stranger.',
		'Call a radio show and request a song.',
		'Watch an old movie.',
		'Raise some money for charity.',
		'Wear something you wouldn’t normally wear.',
		'Call an old friend and catch up.',
		'Practise being ‘in the moment.’',
		'Learn to breathe more fully.',
		'Cook a healthy meal.',
		'Listen to audio books throughout the day and at night.',
		'Make your bed every morning.',
		"Avoid buying things you don't need.",
		'Clean up your room.',
	],
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
	getCountries(state) {
		return state.countries;
	},
	getCountryByCode: (state, getters) => (code) => {
		return getters.getCountries.find(
			(country) => country.alpha3Code === code
		);
	},
	getSearchResults(state) {
		return state.searchResults;
	},
	getCurrentUserSentRequests(state, getters) {
		const user = getters.currentUser;
		if (user.requestsSent) return user.requestsSent;
		return [];
	},
	getRandomRecommendedTodo(state) {
		return state.randomRecommendedTodos[
			Math.floor(Math.random() * state.randomRecommendedTodos.length)
		];
	},
};

export const mutations = {
	setUserData(state, user) {
		state.userId = user.username;
		state.uid = user.uid;
		state.user = user;
	},
	clearUserData(state) {
		state.userId = '';
		state.uid = '';
		state.user = null;
	},
	loadCategoriesData(state, collectionsData) {
		state.categories = collectionsData;
	},
	loadSocialsData(state, socialsData) {
		state.socials = socialsData;
	},
	loadCountries(state, countries) {
		state.countries = countries;
	},
	searchAnything(state, results) {
		state.searchResults = results;
	},
};

export const actions = {
	async onAuthStateChangedAction(ctx, { authUser, claims }) {
		if (!authUser) {
			ctx.commit('clearUserData');
			this.$router.push({ path: '/auth' });
		} else {
			const { uid, email } = authUser;
			const user = await ctx.dispatch('loadUserByUID', uid);
			ctx.commit('setUserData', { ...user, email });
			await ctx.dispatch('users/pushNewUser', user);
			// await ctx.dispatch('todos/loadUserTodos');
			await ctx.dispatch('todos/loadUserTodos', user.username);
			await ctx.dispatch('reviews/loadUserReviews');
			await ctx.dispatch(
				'notifications/loadNotifications',
				user.username
			);
		}
	},
	async signup(context, signupInfo) {
		try {
			const response = await this.$fire.auth.createUserWithEmailAndPassword(
				signupInfo.email,
				signupInfo.password
			);
			const token = await response.user.getIdToken();
			const responseUser = await fb.usersCollection
				.doc(signupInfo.username)
				.set({
					...signupInfo.userInfo,
					uid: response.user.uid,
				});
			context.commit('setUserData', {
				...responseUser.data(),
				token,
			});
			// await context.dispatch('todos/loadUserTodos');
			await context.dispatch('todos/loadUserTodos', signupInfo.username);
			await context.dispatch('reviews/loadUserReviews');
			await context.dispatch(
				'notifications/loadNotifications',
				signupInfo.username
			);
		} catch (error) {
			return error;
		}
	},
	async login(context, signInInfo) {
		try {
			const response = await this.$fire.auth.signInWithEmailAndPassword(
				signInInfo.email,
				signInInfo.password
			);
			const token = await response.user.getIdToken();
			const uid = response.user.uid;
			const userInfo = await context.dispatch('loadUserByUID', uid);
			context.commit('setUserData', {
				token,
				...userInfo,
			});
			// await context.dispatch('todos/loadUserTodos');
			await context.dispatch('todos/loadUserTodos');
			await context.dispatch('reviews/loadUserReviews');
			await context.dispatch('notifications/loadNotifications');
		} catch (error) {
			return error;
		}
	},
	async logout(ctx) {
		await ctx.dispatch('todos/unsubscribe');
		await ctx.dispatch('notifications/unsubscribeService');
		await this.$fire.auth.signOut();
		ctx.commit('clearUserData');
	},
	async loadUserByUID(context, uid) {
		try {
			const response = await fb.usersCollection
				.where('uid', '==', uid)
				.get();
			return {
				...response.docs[0].data(),
				username: response.docs[0].id,
			};
		} catch (error) {
			console.log(error);
		}
	},
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
	async loadCountries({ commit }) {
		const response = await axios.get(
			'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag'
		);
		const countries = response.data;
		commit('loadCountries', countries);
	},
	async searchAnything({ commit, getters, rootGetters }, term) {
		const limit = 4;
		term = term.toLowerCase().trim();
		if (term.replace(/\s+/g, '') === '') {
			commit('searchAnything', {});
			return;
		}
		try {
			// const foundTodos = [];
			// const todosRef = await fb.usersCollection
			// 	.doc(rootGetters.currentUserId)
			// 	.collection('todos')
			// 	.get();
			// const filteredTodos = todosRef.docs.filter((p) =>
			// 	p.data().name.toLowerCase().includes(term)
			// );
			// for (const doc of filteredTodos) {
			// 	if (foundTodos.length === limit) {
			// 		break;
			// 	}
			// 	foundTodos.push(doc.data());
			// }

			const foundUsers = [];
			const userRef = await fb.usersCollection.get();
			const filteredUsers = userRef.docs.filter(
				(p) =>
					p.data().fname.toLowerCase().includes(term) ||
					p.data().lname.toLowerCase().includes(term) ||
					(
						p.data().fname.toLowerCase() +
						' ' +
						p.data().lname.toLowerCase()
					).includes(term) ||
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
				// todos: foundTodos,
				categories: foundCategories,
			};
			commit('searchAnything', results);
		} catch (error) {
			console.log(error);
		}
	},
	clearSearchResults({ commit }) {
		commit('searchAnything', {});
	},
};
