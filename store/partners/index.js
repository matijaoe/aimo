import { nanoid } from 'nanoid';

export const state = () => ({
	partnerships: [
		{ id: nanoid(), partners: ['matijao', 'marian7'] },
		{ id: nanoid(), partners: ['matijao', 'patrik_harmonika'] },
		{ id: nanoid(), partners: ['matijao', 'lovedoctor'] },
		{ id: nanoid(), partners: ['matijao', 'blueface'] },
		{ id: nanoid(), partners: ['patrik_harmonika', 'marian7'] },
		{ id: nanoid(), partners: ['patrik_harmonika', 'tomoKotar14'] },
		{ id: nanoid(), partners: ['tomoKotar14', 'matijao'] },
		{ id: nanoid(), partners: ['tomoKotar14', 'marian7'] },
		{ id: nanoid(), partners: ['lovedoctor', 'patrik_harmonika'] },
		{ id: nanoid(), partners: ['lovedoctor', 'wood42'] },
		{ id: nanoid(), partners: ['wood42', 'suzzy'] },
		{ id: nanoid(), partners: ['patrik_harmonika', 'suzzy'] },
		{ id: nanoid(), partners: ['wood42', 'tomoKotar14'] },
		{ id: nanoid(), partners: ['blueface', 'tomoKotar14'] },
		{ id: nanoid(), partners: ['blueface', 'wood42'] },
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

export const mutations = {
	// 	updateValue(state, payload) {
	// 		state.value = payload;
	// 	},
};

export const actions = {};
