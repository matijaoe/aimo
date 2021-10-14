import fbApp from 'firebase/app';
import * as fb from '@/firebase';

export const state = () => ({
	partnerships: [],
});

export const getters = {
	partnerships(state) {
		return state.partnerships || [];
	},
	getPartnersById: (state, getters, rootState, rootGetters) => (username) => {
		const { partners: partnerUsernames } =
			rootGetters['users/getUserById'](username);
		return partnerUsernames.map((partnerId) =>
			rootGetters['users/getUserById'](partnerId)
		);
	},
};

export const mutations = {};

export const actions = {
	async addPartner({ commit }, partner1, partner2) {
		await fb.usersCollection.doc(partner1).set({
			par: fbApp.firestore.Timestamp.now(),
		});
		fb.usersCollection.doc(partner2).set({
			partnerSince: fbApp.firestore.Timestamp.now(),
		});
	},
};
