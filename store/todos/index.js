// Ovo nije prava struktura od todosa nego samo za mockup
import { nanoid } from 'nanoid';
export const state = () => ({
	todos: {
		matijao: [
			{
				id: nanoid(),
				name: 'citati knjigu',
				desc: '',
				categories: ['VQDonT7_pB4ACAW6DZsiL', 'VquU1OBaiUo02JuSuZRO8'],
				timestamp: 1618916803496,
				done: false,
				approved: false,
				daily: true,
				important: true,
				partner: 'patrik_harmonika',
			},
			{
				id: nanoid(),
				name: 'odvoziti bicikl',
				desc: '',
				categories: [
					'BR2eOYR1Y6u_Yp_H58xD1',
					'xUMFQYg3iBJbptNBUqsCK',
					'uUCM7KHa7XlSzqpqX7iY3',
				],
				timestamp: 1618916803496,
				done: true,
				approved: true,
				daily: false,
				important: true,
				partner: 'marian7',
			},
			{
				id: nanoid(),
				name: 'random task',
				desc: '',
				categories: [],
				timestamp: 1618916803496,
				done: true,
				approved: false,
				daily: false,
				important: false,
				partner: null,
			},
			{
				id: nanoid(),
				name: 'napraviti pripremu iz Bazi Podataka',
				desc: '',
				categories: [
					'OWEhqyLlnnWQGEUAHzGhe',
					'QJNdchJLDfKZcR-O3ytn3',
					'8MNLJ4yg15YoRch0t3NAG',
				],
				timestamp: 1618916803496,
				done: false,
				approved: false,
				daily: false,
				important: false,
				partner: 'tomoKotar14',
			},
			{
				id: nanoid(),
				name: 'bicep curls',
				desc: '',
				categories: ['0TN9zbVVaZOhWswtztYYn', 'BR2eOYR1Y6u_Yp_H58xD1'],
				timestamp: 1618916803496,
				done: false,
				approved: false,
				daily: false,
				important: true,
				partner: 'marian7',
			},
			{
				id: nanoid(),
				name: 'deadlift',
				desc: '',
				categories: ['0TN9zbVVaZOhWswtztYYn', 'BR2eOYR1Y6u_Yp_H58xD1'],
				timestamp: 1618916803496,
				done: true,
				approved: true,
				daily: false,
				important: false,
				partner: 'marian7',
			},
			{
				id: nanoid(),
				name: 'pogledati utakmicu',
				desc: '',
				categories: [
					'Bzw_jJ7m-I6vuN4HaFsDv',
					'4OgWmONbRqhKYtDJTjd0I',
					'0iUqkyVh0IliBfXtyOj7r',
				],
				timestamp: 1618916803496,
				done: false,
				approved: false,
				daily: false,
				important: false,
				partner: null,
			},
			{
				id: nanoid(),
				name: 'gasirat',
				desc: '',
				categories: [],
				timestamp: 1618916803496,
				done: false,
				approved: false,
				daily: true,
				important: false,
				partner: 'blueface',
			},
			{
				id: nanoid(),
				name: 'nacrtati brodić i more',
				desc: '',
				categories: ['kmTtKxOMeKfuNoU_kG-yp'],
				timestamp: 1618916803496,
				done: true,
				approved: false,
				daily: false,
				important: false,
				partner: 'lovedoctor',
			},
		],
		marian7: [
			{
				id: nanoid(),
				name: 'boksati',
				desc: '',
				categories: ['BR2eOYR1Y6u_Yp_H58xD1', '0TN9zbVVaZOhWswtztYYn'],
				timestamp: 1618916803496,
				done: false,
				approved: false,
				daily: true,
				important: true,
				partner: 'patrik_harmonika',
			},
			{
				id: nanoid(),
				name: 'svirat frulu',
				desc: '',
				categories: ['wuH147eN-7R2g4EeJrB09', 'jcE5bvcPrBYb2bstsEWgE'],
				timestamp: 1618916803496,
				done: true,
				approved: false,
				daily: true,
				important: true,
				partner: null,
			},
		],
	},
});

export const getters = {
	currentUserTodos(state, getters, rootState, rootGetters) {
		return getters.getTodosByUser(rootGetters.currentUserId);
	},
	getTodosByUser: (state, getters) => (username) => {
		return state.todos[username];
	},
	getTodoById: (state, getters) => (id) => {
		return getters.currentUserTodos.find((todo) => todo.id === id);
	},
	getFavoriteTodos(state, getters) {
		return getters.currentUserTodos.filter((todo) => todo.favorite);
	},
	importantTodos(state, getters) {
		return getters.currentUserTodos.filter((todo) => todo.important);
	},
	completedTodos(state, getters) {
		return getters.currentUserTodos.filter((todo) => todo.done);
	},
	approvedTodos(state, getters) {
		return getters.currentUserTodos.filter((todo) => todo.approved);
	},
	dailyTodos(state, getters) {
		return getters.currentUserTodos.filter((todo) => todo.daily);
	},
	personalTodos(state, getters) {
		return getters.currentUserTodos.filter((todo) => !todo.partner);
	},
	activePartnersUsername(state, getters) {
		return getters.currentUserTodos
			.filter((todo) => todo.partner)
			.map((todo) => todo.partner)
			.filter((value, index, self) => self.indexOf(value) === index);
	},
	activeTags(state, getters, rootState, rootGetters) {
		const tagIds = getters.currentUserTodos
			.filter((todo) => todo.categories.length > 0)
			.map((todo) => todo.categories)
			.flat()
			.filter((value, index, self) => self.indexOf(value) === index);
		const tags = [];
		for (const tagId of tagIds) {
			tags.push(rootGetters.getCategoryById(tagId));
		}
		return tags;
	},
	todosByPartner: (state, getters) => (username) => {
		return getters.currentUserTodos.filter(
			(todo) => todo.partner === username
		);
	},
	todosByTag: (state, getters) => (tagId) => {
		return getters.currentUserTodos.filter((todo) =>
			todo.categories.includes(tagId)
		);
	},
	// getTodosByStatus: (state, getters) => (status) => {
	// 	return getters.currentUserTodos.filter((todo) => todo.status === status);
	// },
	// getTodoInteractions: (state, getters) => (id) => {
	// 	return getters.getTodoById(id).interactions;
	// },
};

export const actions = {
	changeFavorite(context, payload) {
		context.commit('setFavoriteStatus', payload);
	},
};

export const mutations = {
	setFavoriteStatus(state, payload) {
		state.todos.find((todo) => todo.id === payload.id).favorite =
			payload.favorite;
	},
};
