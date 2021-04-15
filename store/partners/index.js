export const state = () => ({
	partnerships: [
		{ id: '1', partners: ['matijao', 'marian7'] },
		{ id: '2', partners: ['matijao', 'patrik_harmonika'] },
		{ id: '3', partners: ['patrik_harmonika', 'marian7'] },
		{ id: '4', partners: ['patrik_harmonika', 'tomoKotar14'] },
		{ id: '5', partners: ['tomoKotar14', 'matijao'] },
		{ id: '6', partners: ['koralj11', 'markoc'] },
		{ id: '7', partners: ['koralj11', 'marian7'] },
		{ id: '8', partners: ['koralj11', 'matijao'] },
	],
});

export const getters = {
	partnerships(state) {
		return state.partnerships || [];
	},
};

// export const mutations = {
// 	updateValue(state, payload) {
// 		state.value = payload;
// 	},
// };

export const actions = {};
