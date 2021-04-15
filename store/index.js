export const state = () => ({
	userId: 'matijao',
});

export const getters = {
	currentUserId(state) {
		return state.userId;
	},
	currentUser(state, getters) {
		// tu cemo moc direkt iz firestora dohvatit naseg usera
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
