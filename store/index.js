export const state = () => ({
	userId: 'marian7',
});

export const getters = {
	currentUserId(state) {
		return state.userId;
	},
	currentUser(state, getters) {
		const allUsers = getters['users/users'];
		const currentUser = allUsers.find(
			(user) => user.username === getters.currentUserId
		);
		return currentUser;
	},
};

// export const mutations = {
// 	updateValue(state, payload) {
// 		state.value = payload;
// 	},
// };

// export const actions = {
// 	updateActionValue({ commit }) {
// 		commit('updateValue', payload);
// 	},
// };
