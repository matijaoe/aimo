// Ovo nije prava struktura od todosa nego samo za mockup
import { nanoid } from 'nanoid';
import Vue from 'vue';
import * as fb from '@/firebase';

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
		return getters.currentUserTodos.find((todo) => todo.id === id);
	},
	getCurrentUserTodoPartners(state, getters, rootState, rootGetters) {
		const partnerUsernames = state.todos.matijao
			.map((todo) => todo.partner)
			.filter(
				(username, index, self) =>
					username !== '' && self.indexOf(username) === index
			);
		return rootGetters['partners/getPartnersById'](
			rootGetters.currentUserId
		).filter((partner) => partnerUsernames.includes(partner.username));
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

export const mutations = {
	loadUserTodos(state, userTodos) {
		state.todos.matijao = userTodos;
	},
	addNewTodo(state, payload) {
		const newTodo = {
			...payload,
			id: nanoid(),
		};
		state.todos.matijao.unshift(newTodo);
	},
	updateTodo(state, payload) {
		const index = state.todos.matijao.findIndex(
			(todo) => todo.id === payload.id
		);
		Vue.set(state.todos.matijao, index, payload);
	},
	updateIsDoneStatus(state, payload) {
		const index = state.todos.matijao.findIndex(
			(todo) => todo.id === payload.id
		);
		state.todos.matijao[index].done = payload.done;
	},
	deleteTodo(state, payload) {
		const index = state.todos.matijao.findIndex(
			(todo) => todo.id === payload.id
		);
		state.todos.matijao.splice(index, 1);
	},
	updateImportantStatus(state, payload) {
		const index = state.todos.matijao.findIndex(
			(todo) => todo.id === payload.id
		);
		state.todos.matijao[index].important = payload.important;
	},
	updateDailyStatus(state, todoStatus) {
		const index = state.todos.matijao.findIndex(
			(todo) => todo.id === todoStatus.id
		);
		state.todos.matijao[index].daily = todoStatus.daily;
	},
};

export const actions = {
	async addTodo({ commit, getters, rootGetters }, payload) {
		try {
			await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.doc(payload.id)
				.set({
					approved: payload.approved,
					categories: payload.categories,
					daily: payload.daily,
					desc: payload.desc,
					done: payload.done,
					id: payload.id, // ovo je samo privremeno rješenje da ne izbacuje gresku za id (koji je nepotreban u ovom slucaju)
					important: payload.important,
					name: payload.name,
					partner: payload.partner,
					timestamp: payload.timestamp,
				});
		} catch (error) {
			console.log(error);
		}
		commit('addNewTodo', payload);
	},
	async updateTodo({ commit, getters, rootGetters }, payload) {
		try {
			await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.doc(payload.id)
				.set({
					approved: payload.approved,
					categories: payload.categories,
					daily: payload.daily,
					desc: payload.desc,
					done: payload.done,
					id: payload.id, // ovo je samo privremeno rješenje da ne izbacuje gresku za id (koji je nepotreban u ovom slucaju)
					important: payload.important,
					name: payload.name,
					partner: payload.partner,
					timestamp: payload.timestamp,
				});
		} catch (error) {
			console.log(error);
		}
		commit('updateTodo', payload);
	},
	async updateIsDoneStatus({ commit, getters, rootGetters }, payload) {
		try {
			await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.doc(payload.id)
				.update({
					done: payload.done,
				});
		} catch (error) {
			console.log(error);
		}
		commit('updateIsDoneStatus', payload);
	},
	async updateImportantStatus({ commit, getters, rootGetters }, payload) {
		try {
			await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.doc(payload.id)
				.update({
					important: payload.important,
				});
		} catch (error) {
			console.log(error);
		}
		commit('updateImportantStatus', payload);
	},
	async deleteTodo({ commit, getters, rootGetters }, payload) {
		try {
			await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.doc(payload.id)
				.delete();
		} catch (error) {
			console.log(error);
		}
		commit('deleteTodo', payload);
	},
	async updateDailyStatus({ commit, getters, rootGetters }, todoStatus) {
		try {
			await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.doc(todoStatus.id)
				.update({
					daily: todoStatus.daily,
				});
		} catch (error) {
			console.log(error);
		}
		commit('updateDailyStatus', todoStatus);
	},
	async loadUserTodos({ commit, getters, rootGetters }) {
		try {
			const todos = await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.orderBy('timestamp', 'desc')
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
			// eslint-disable-next-line no-console
			console.error(error);
		}
	},
};
