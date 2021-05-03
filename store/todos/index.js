// Ovo nije prava struktura od todosa nego samo za mockup
import { nanoid } from 'nanoid';
import { db } from '@/firebase';
export const state = () => ({
	todos: {
		matijao: [],
	},
});

export const getters = {
	currentUserTodos(state, getters, rootState, rootGetters) {
		return getters.getTodosByUser(rootGetters.currentUserId);
	},
	getTodosByUser: (state, getters) => (username) => {
		return state.todos[username];
	},
	getCurrentUserTodoById: (state, getters) => (id) => {
		console.log(getters.currentUserTodos.find((todo) => todo.id === id));
		return getters.currentUserTodos.find((todo) => todo.id === id);
	},
	getUserTodoById: (state, getters) => (username, id) => {
		return getters.getTodosByUser(username).find((todo) => todo.id === id);
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
	addNewTodo({ commit }, payload) {
		commit('addNewTodo', payload);
	},
	async loadUserTodos({ commit }) {
		try {
			const todos = await db
				.collection('users')
				.doc('matijao')
				.collection('todos')
				.get();
			const userTodos = [];
			for (const doc of todos.docs) {
				userTodos.push({
					...doc.data(),
					username: doc.id,
				});
			}
			commit('loadUserTodos', userTodos);
		} catch (error) {
			console.error(error);
		}
	},
};

export const mutations = {
	loadUserTodos(state, userTodos) {
		state.todos.matijao = userTodos;
	},
	setFavoriteStatus(state, payload) {
		state.todos.find((todo) => todo.id === payload.id).favorite =
			payload.favorite;
	},
	addNewTodo(state, payload) {
		const newTodo = {
			...payload,
			id: nanoid(),
		};
		state.todos.matijao.unshift(newTodo);
		db.collection('users')
			.doc('matijao')
			.collection('todos')
			.doc(newTodo.id)
			.set({
				approved: newTodo.approved,
				categories: newTodo.categories,
				daily: newTodo.daily,
				desc: newTodo.desc,
				done: newTodo.done,
				id: nanoid(), // ovo je samo privremeno rješenje da ne izbacuje gresku za id (koji je nepotreban u ovom slucaju)
				important: newTodo.important,
				name: newTodo.name,
				partner: newTodo.partner,
				timestamp: newTodo.timestamp,
			});
	},
};
