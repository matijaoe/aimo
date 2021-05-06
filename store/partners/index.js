import * as fb from '@/firebase';
import fbApp from 'firebase/app';

export const state = () => ({
	partnerships: [],
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
						doc,
						docPartner
					);
					if (!areDuplicates) {
						partnersData.push([doc.id, docPartner.id]);
					}
				}
			}

			commit(
				'loadPartnersData',
				actions.convertToArrayOfObjects(partnersData)
			);
		} catch (error) {
			console.error(error);
		}
	},

	checkIfDuplicates(partnersData, doc, docPartner) {
		const alreadyPartners = partnersData.filter(
			(partnership) =>
				partnership[0] === docPartner.id && partnership[1] === doc.id
		);
		if (alreadyPartners.length === 0) {
			return false;
		}
		return true;
	},

	convertToArrayOfObjects(partnersData) {
		const arrayOfPartnershipObjects = [];
		for (const partnershipArray of partnersData) {
			arrayOfPartnershipObjects.push({
				partners: partnershipArray,
			});
		}

		return arrayOfPartnershipObjects;
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
};
