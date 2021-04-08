export const state = () => ({
	users: [
		{
			username: 'marian7',
			fname: 'Barian',
			lname: 'Mamić',
			age: 24,
			image: 'http://placeimg.com/300/300/animals', // neki library za default slike ako user ne postavi sliku, neki avatar ili inicijali
			country: 'Hong Kong', // ili country code; dohvatit cu zastavu prek apija
			joined: null, // timestamp kad je kreirao account
			lastOnline: null, // nekakvi timestamp kad je last online, optional
			coins: 400,
			categories: [{ id: '', name: '' }],
			badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: false,
			// ili todos array koji pa ima key koji oznacuje kojoj listi priprada
			lists: [
				{
					id: '',
					timestamp: '',
					name: '',
					partner: '',
					todos: {
						id: '',
						title: '',
						desc: '', // optional
						urgency: '',
						categories: [{ id: '', name: '' }],
						isDaily: false,
						timestamp: null,
						approved: false,
					},
					likes: [{ user: '' }],
					comments: [
						{
							id: '',
							timestamp: '',
							user: '',
							content: '',
							likes: [{ user: '' }],
						},
					],
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
