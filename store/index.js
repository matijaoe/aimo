export const state = () => ({
	userId: 'marian7',
});

export const getters = {
	currentUser(state) {
		return state.userId;
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
