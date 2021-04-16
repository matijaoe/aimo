import { nanoid } from 'nanoid';

export const state = () => ({
	partnerships: [
		{ id: nanoid(), partners: ['matijao', 'marian7'] },
		{ id: nanoid(), partners: ['matijao', 'patrik_harmonika'] },
		{ id: nanoid(), partners: ['patrik_harmonika', 'marian7'] },
		{ id: nanoid(), partners: ['patrik_harmonika', 'tomoKotar14'] },
		{ id: nanoid(), partners: ['tomoKotar14', 'matijao'] },
		{ id: nanoid(), partners: ['koralj11', 'markoc'] },
		{ id: nanoid(), partners: ['koralj11', 'marian7'] },
		{ id: nanoid(), partners: ['koralj11', 'matijao'] },
	],
});

export const getters = {
	partnerships(state) {
		return state.partnerships || [];
	},
	getPartnersById: (state, getters, rootState, rootGetters) => (username) => {
		const userPartners = [];

		for (const partnership of getters.partnerships) {
			if (partnership.partners.includes(username)) {
				const partnerId = partnership.partners.find(
					(p) => p !== username
				);
				const partner = rootGetters['users/getUserById'](partnerId);
				userPartners.push(partner);
			}
		}

		return userPartners;
	},
};

// export const mutations = {
// 	updateValue(state, payload) {
// 		state.value = payload;
// 	},
// };

export const actions = {};
