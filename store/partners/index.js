import * as fb from '@/firebase';
import fbApp from 'firebase/app';
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
/*
export const mutations = {
	// 	updateValue(state, payload) {
	// 		state.value = payload;
	// 	},
	loadPartnersData(state, partnersData) {
		state.partnerships = partnersData;
	},
};

export const actions = {
	async loadPartnersData({ commit }) {
		try {
			const users = await fb.usersCollection.get();

			const partnersData = [];
			for (const doc of users.docs) {
				const userPartners = await fb.usersCollection
					.doc(doc.id)
					.collection('partners')
					.get();
				for (const docPartner of userPartners.docs) {
					const areDuplicates = actions.checkIfDuplicates(
						partnersData,
						docPartner,
						doc
					);
					if (!areDuplicates) {
						partnersData.push([doc.id, docPartner.id]);
					}
				}
			}

			commit('loadPartnersData', partnersData);
		} catch (error) {
			console.error(error);
		}
	},

	checkIfDuplicates(partnersData, docPartner, doc) {
		const alreadyPartners = partnersData.filter(
			(partnership) =>
				partnership[0] === docPartner.id && partnership[1] === doc.id
		);
		if (alreadyPartners.length === 0) {
			return true;
		}
		return false;
	},

	async addPartner({ commit }, partner1, partner2) {
		await fb.usersCollection
			.doc(partner1)
			.collection('partners')
			.doc(partner2)
			.set({
				partnerSince: fbApp.firestore.Timestamp.now(),
			});
		fb.usersCollection
			.doc(partner2)
			.collection('partners')
			.doc(partner1)
			.set({
				partnerSince: fbApp.firestore.Timestamp.now(),
			});
	},
}; */
