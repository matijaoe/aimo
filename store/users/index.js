import * as fb from '@/firebase';

function freq(nums) {
	return nums.reduce((acc, curr) => {
		acc[curr] = -~acc[curr];
		return acc;
	}, {});
}

// `https://avatar.oxro.io/avatar.svg?name=${user.fname}${user.lname}&caps=1&fontSize=200&bold=true&background=${bgColor}&color=${textColor}`

export const state = () => ({
	users: [],
});

export const getters = {
	users(state) {
		return state.users || [];
	},
	getUserById: (state, getters) => (username) => {
		return getters.users.find((user) => user.username === username);
	},
};

export const mutations = {
	loadUserData(state, userData) {
		state.users = userData;
	},
	pushUserToUsers(state, user) {
		state.users.push(user);
	},
};

export const actions = {
	pushNewUser({ commit }, user) {
		commit('pushUserToUsers', user);
	},
	async updateUserCoins(context, updateInfo) {
		try {
			const doc = await fb.usersCollection.doc(updateInfo.username).get();
			const { coins } = doc.data();
			await fb.usersCollection
				.doc(updateInfo.username)
				.update({ coins: coins + updateInfo.amount });
		} catch (error) {
			console.log(error);
		}
	},
	async loadUserData({ commit }) {
		try {
			const users = await fb.usersCollection.get();

			const userData = [];
			for (const doc of users.docs) {
				userData.push({ ...doc.data(), username: doc.id });
			}

			commit('loadUserData', userData);
		} catch (error) {
			console.error(error);
		}
	},
	async loadUserById(context, username) {
		let user = {};
		try {
			const doc = await fb.usersCollection.doc(username).get();
			if (doc.exists) {
				user = { ...doc.data(), username };
			} else {
				return { error: true };
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
		return user;
	},
	async getUserCategories({ dispatch, rootGetters }, info) {
		const todos =
			(await dispatch('todos/getUserTodosByUsername', info.username, {
				root: true,
			})) || [];

		// array of all todo category ids
		const categoryIds = todos.map((todo) => todo.categories).flat();

		// object of category ids frequencies
		const categoryFreq = freq(categoryIds);

		// array of category ids ordered by frequency
		const categoriesSorted = Object.entries(categoryFreq)
			.sort((a, b) => b[1] - a[1])
			.map((arr) => arr[0])
			.slice(0, info.amount || -1);

		return categoriesSorted.map((catId) => {
			return rootGetters.getCategoryById(catId);
		});
	},
	// async addUsers() {
	// 	for (const user of state.users) {
	// 		await fb.usersCollection
	// 			.doc(user.username)
	// 			.set({
	// 				fname: user.fname,
	// 				lname: user.lname,
	// 				countryCode: user.countryCode,
	// 				birthday: user.birthday.$d,
	// 				joined_on: user.joined_on.$d,
	// 				photo: user.photo,
	// 				occupation: user.occupation,
	// 				bio: user.bio,
	// 				coins: user.coins,
	// 				isPremium: user.isPremium,
	// 				categories: user.categories,
	// 				socials: user.socials,
	// 				partners: [],
	// 			})
	// 			.then(() => {
	// 				console.log('Document successfully written!');
	// 			})
	// 			.catch((error) => {
	// 				console.error('Error writing document: ', error);
	// 			});
	// 	}
	// },
};
