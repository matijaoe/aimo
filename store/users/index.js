export const state = () => ({
	users: [
		{
			username: 'marian7',
			fname: 'Barian',
			lname: 'Mamić',
			age: 24,
			photo:
				'https://our.umbraco.com/media/wiki/270186/636266273433443386_muskpng.png',
			bio: 'Skoro sam zaspo 7 puta. U ovih pol@sata',
			country: 'Croatia', // ili country code; dohvatit cu zastavu prek apija
			joined_on: 'January, 2021', // timestamp kad je kreirao account
			coins: 201,
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
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
			notifications: [
				'Matija gave you recognition',
				'Zoki commented on your post',
				'Patrik beat your streak',
				'Lorena loves you and takes care of you',
			],
		},
		{
			username: 'matijao',
			fname: 'Matija',
			lname: 'Osrečki',
			age: 13,
			photo:
				'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg',
			bio: '',
			country: 'Croatia',
			joined_on: 'March, 2021', // timestamp kad je kreirao account
			coins: 211,
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: true,
			notifications: [
				'Marian forgot to share his screen',
				'Marian will beat you up',
			],
		},
		{
			username: 'patrik_harmonika',
			fname: 'Patrik',
			lname: 'Slovic',
			age: 55,
			photo:
				'https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg',
			bio: 'Mi culo está en fuego',
			country: 'Spain',
			joined_on: 'January, 2021', // timestamp kad je kreirao account
			coins: 453,
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: false,
			notifications: ['Zoki sent you a partner request'],
		},
		{
			username: 'tomoKotar14',
			fname: 'Tomislav',
			lname: 'Mikšik',
			age: 34,
			photo:
				'https://pbs.twimg.com/profile_images/712382030064062465/HoG1N4E0_400x400.jpg',
			bio: 'Bio i ošo',
			country: 'Nigeria',
			joined_on: 'October, 2020', // timestamp kad je kreirao account
			coins: 45,
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: false,
			notifications: [],
		},
		{
			username: 'svenich',
			fname: 'Stan',
			lname: 'Svenovljević',
			age: 11,
			photo:
				'https://www.dalia-partyshop.hr/sites/default/files/styles/large/public/2018-04/Vatrogasac%20Vjeko_0.jpg',
			bio: '🐀🐀🐀🐀🐀',
			country: 'Kosovo',
			joined_on: 'April, 2021', // timestamp kad je kreirao account
			coins: 6,
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: false,
			notifications: ['Matija beat your bench press national record'],
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

export const actions = {
	getUserById(context, id) {
		const user = context.getters.users.find((u) => u.username === id);
		return user;
	},
};
