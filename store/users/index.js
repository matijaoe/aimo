export const state = () => ({
	users: [
		{
			username: 'marian7',
			fname: 'Barian',
			lname: 'Mamić',
			age: 24,
			country: 'Hong Kong',
			image: 'http://placeimg.com/300/300/animals',
			todos: [
				{
					title: '',
					desc: '',
					urgency: '',
					partner: '',
					isDaily: false,
				},
			],
		},
		{
			username: 'psven',
			fname: 'Pavlo',
			lname: 'Svevnisavljević',
			age: 32,
			country: 'French Guiana',
			image: 'http://placeimg.com/301/301/animals',
		},
		{
			username: 'tome71',
			fname: 'Veršo',
			lname: 'Tomić',
			age: 18,
			country: 'Montenegro',
			image: 'http://placeimg.com/302/302/animals',
		},
		{
			username: 'suncana420',
			fname: 'Sunčana',
			lname: 'Cvijetić',
			age: 19,
			country: 'Serbia',
			image: 'http://placeimg.com/303/303/animals',
		},
	],
});

export const getters = {
	users(state) {
		return state.users || [];
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
