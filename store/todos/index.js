// Ovo nije prava struktura od todosa nego samo za mockup
import Vue from 'vue';
import * as fb from '@/firebase';

export const state = () => ({
	currentUserTodos: [],
});

export const getters = {
	currentUserTodos(state) {
		return state.currentUserTodos;
	},
	currentUserTodoCollection(state, getters, rootState, rootGetters) {
		return fb.usersCollection
			.doc(rootGetters.currentUserId)
			.collection('todos');
	},
	getCurrentUserTodoById: (state, getters) => (id) => {
		return getters.currentUserTodos.find((todo) => todo.id === id);
	},
	getCurrentUserTodoPartners(state, getters, rootState, rootGetters) {
		const partnerUsernames = getters.currentUserTodos
			.map((todo) => todo.partner)
			.filter(
				(username, index, self) =>
					username !== '' && self.indexOf(username) === index
			);
		const activePartners = [];
		for (const partUsername of partnerUsernames) {
			activePartners.push(rootGetters['users/getUserById'](partUsername));
		}
		return activePartners;
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
};

export const mutations = {
	loadUserTodos(state, userTodos) {
		state.currentUserTodos = userTodos;
	},
	addNewTodo(state, todo) {
		const newTodo = { ...todo };
		state.currentUserTodos.unshift(newTodo);
	},
	updateTodo(state, todo) {
		const index = state.currentUserTodos.findIndex((t) => t.id === todo.id);
		Vue.set(state.currentUserTodos, index, todo);
	},
	deleteTodo(state, todo) {
		const index = state.currentUserTodos.findIndex((t) => t.id === todo.id);
		state.currentUserTodos.splice(index, 1);
	},
};

export const actions = {
	async addTodo({ commit, rootGetters }, todo) {
		try {
			const newTodo = await fb.usersCollection
				.doc(rootGetters.currentUserId)
				.collection('todos')
				.add(todo);

			if (todo.partner) {
				await fb.usersCollection
					.doc(todo.partner)
					.collection('reviews')
					.add({
						partner: rootGetters.currentUserId,
						todoId: newTodo.id,
						reviewed: false,
					});
			}
			todo.id = newTodo.id;
		} catch (error) {
			console.log(error);
		}

		commit('addNewTodo', todo);
	},
	async updateTodo({ commit, getters }, todo) {
		commit('updateTodo', todo);
		try {
			await getters.currentUserTodoCollection.doc(todo.id).update(todo);
		} catch (error) {
			console.log(error);
		}
	},
	async deleteTodo({ commit, getters }, todo) {
		try {
			await getters.currentUserTodoCollection.doc(todo.id).delete();
		} catch (error) {
			console.log(error);
		}
		commit('deleteTodo', todo);
	},
	async loadUserTodos({ commit, getters }) {
		try {
			const todos = await getters.currentUserTodoCollection
				.orderBy('timestamp', 'desc')
				.get();

			const userTodos = [];
			for (const doc of todos.docs) {
				userTodos.push({ ...doc.data(), id: doc.id });
			}
			commit('loadUserTodos', userTodos);
		} catch (error) {
			console.error(error);
		}
	},
	async updateUserTodo(context, todo) {
		try {
			await fb.usersCollection
				.doc(todo.owner)
				.collection('todos')
				.doc(todo.id)
				.update({ approved: true, review: todo.review });
		} catch (error) {
			console.log(error);
		}
	},
	async getUserTodosByUsername(context, username) {
		try {
			const resp = await fb.usersCollection
				.doc(username)
				.collection('todos')
				.orderBy('timestamp', 'desc')
				.get();
			const todos = [];
			for (const doc of resp.docs) {
				todos.push({
					...doc.data(),
					id: doc.id,
				});
			}
			return todos;
		} catch (error) {
			console.log(error);
		}
		return [];
	},
};
