import * as fb from '@/firebase';
import { orderBy as _orderBy } from 'lodash';
import dayjs from 'dayjs';

export const state = () => ({
	notifications: [],
	notificationService: null,
});

export const getters = {
	notifications(state) {
		return _orderBy(state.notifications, ['created'], ['desc']);
	},
};

export const mutations = {
	unshiftNotification(state, notification) {
		state.notifications.unshift(notification);
	},
	removeNotification(state, notificationId) {
		const index = state.notifications.findIndex(
			(n) => n.id === notificationId
		);
		state.notifications.splice(index, 1);
	},
	setServiceStatus(state, details) {
		if (details.option) {
			state.notificationService = details.service;
		} else {
			state.notificationService();
			state.notificationService = null;
			state.notifications = [];
		}
	},
};

export const actions = {
	loadNotifications(ctx, username) {
		const collection = fb.usersCollection
			.doc(username)
			.collection('notifications');

		const notServ = collection.onSnapshot((res) => {
			const changes = res.docChanges();
			changes.forEach((change) => {
				if (change.type === 'added') {
					ctx.commit('unshiftNotification', {
						...change.doc.data(),
						id: change.doc.id,
					});
				}
				if (change.type === 'removed') {
					ctx.commit('removeNotification', change.doc.id);
				}
			});
		});
		ctx.commit('setServiceStatus', { service: notServ, option: true });
	},
	unsubscribeService(ctx) {
		ctx.commit('setServiceStatus', { option: false });
	},
	async deleteNotification(ctx, notId) {
		await fb.usersCollection
			.doc(ctx.rootGetters.currentUserId)
			.collection('notifications')
			.doc(notId)
			.delete();
	},
	async acceptPartnerRequest(ctx, requestDetails) {
		const userRef = fb.usersCollection.doc(ctx.rootGetters.currentUserId);
		const partnerRef = fb.usersCollection.doc(requestDetails.partner);
		const notRef = fb.usersCollection
			.doc(ctx.rootGetters.currentUserId)
			.collection('notifications')
			.doc(requestDetails.id);
		try {
			await fb.db.runTransaction(async (t) => {
				const docUser = await t.get(userRef);
				const docPartner = await t.get(partnerRef);
				const newPartners = [
					...docUser.data().partners,
					requestDetails.partner,
				];
				const newPartnerPartners = [
					...docPartner.data().partners,
					ctx.rootGetters.currentUserId,
				];
				const partnerSentRequests = [];
				docPartner.data().requestsSent.forEach((req) => {
					if (req !== ctx.rootGetters.currentUserId) {
						partnerSentRequests.push(req);
					}
				});
				await t.update(userRef, { partners: newPartners });
				await t.update(partnerRef, {
					partners: newPartnerPartners,
					requestsSent: partnerSentRequests,
				});
				await t.delete(notRef);
				return `User ${requestDetails.partner} added!`;
			});
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	},
	async declinePartnerRequest(ctx, requestDetails) {
		const partnerRef = fb.usersCollection.doc(requestDetails.partner);
		const notRef = fb.usersCollection
			.doc(ctx.rootGetters.currentUserId)
			.collection('notifications')
			.doc(requestDetails.id);
		try {
			await fb.db.runTransaction(async (t) => {
				const docPartner = await t.get(partnerRef);
				const partnerSentRequests = [];
				docPartner.data().requestsSent.forEach((req) => {
					if (req !== ctx.rootGetters.currentUserId) {
						partnerSentRequests.push(req);
					}
				});
				await t.update(partnerRef, {
					requestsSent: partnerSentRequests,
				});
				await t.delete(notRef);
				return `User ${requestDetails.partner} added!`;
			});
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	},
	async sendPartnerRequest(ctx, requestData) {
		const senderRef = fb.usersCollection.doc(ctx.rootGetters.currentUserId);
		const destRef = fb.usersCollection
			.doc(requestData.partner)
			.collection('notifications')
			.doc();
		try {
			await fb.db.runTransaction(async (t) => {
				const senderDoc = await t.get(senderRef);
				let senderRequests = [];
				if (senderDoc.data().requestsSent) {
					senderRequests = [
						...senderDoc.data().requestsSent,
						requestData.partner,
					];
				} else {
					senderRequests = [requestData.partner];
				}
				await t.update(senderRef, { requestsSent: senderRequests });
				await t.set(destRef, {
					type: 'request',
					partner: ctx.rootGetters.currentUserId,
					created: dayjs().$d,
					message: `${ctx.rootGetters.currentUserId} sent you partner request.`,
				});
			});
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	},
};
