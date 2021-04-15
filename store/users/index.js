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
			occupation: 'Student',
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: false,
			// ili todos array koji pa ima key koji oznacuje kojoj listi priprada
			// lists: [
			// 	{
			// 		id: '',
			// 		timestamp: '',
			// 		name: '',
			// 		partner: '',
			// 		todos: {
			// 			id: '',
			// 			title: '',
			// 			desc: '', // optional
			// 			urgency: '',
			// 			categories: [{ id: '', name: '' }],
			// 			isDaily: false,
			// 			timestamp: null,
			// 			approved: false,
			// 		},
			// 		likes: [{ user: '' }],
			// 		comments: [
			// 			{
			// 				id: '',
			// 				timestamp: '',
			// 				user: '',
			// 				content: '',
			// 				likes: [{ user: '' }],
			// 			},
			// 		],
			// 	},
			// ],
			notifications: [
				'Matija gave you recognition',
				'Zoki commented on your post',
				'Patrik beat your streak',
				'Lorena loves you and takes care of you',
				'Matija endorsed your exceptional Vue skills',
			],
			socials: [
				'instagram',
				'linkedin',
				'github',
				'discord',
				'stack-overflow',
				'whatsapp',
				'messenger',
			],
		},
		{
			username: 'matijao',
			fname: 'Matija',
			lname: 'Osrečki',
			age: 17,
			photo:
				'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg',
			bio: 'Different strokes for different folkes 🍭',
			country: 'Croatia',
			joined_on: 'March, 2021',
			coins: 211,
			occupation: 'Web Dev',
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: true,
			notifications: [
				'Marian forgot to share his screen',
				'Tomo liked your streak',
				'You were voted best programmer on the platform 3rd month in a row',
				'Marian endorsed your Vue skills',
				'Koraljka liked your goals list',
				'Stan Svenovljević joined you in your monthly challenge',
				'Stan Svenovljević commented on your post',
			],
			socials: [
				'github',
				'linkedin',
				'discord',
				'telegram',
				'reddit',
				'codepen',
				'dribbble',
				'behance',
				'stack-overflow',
				'medium',
				'bitcoin',
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
			joined_on: 'January, 2021',
			coins: 453,
			occupation: 'Musician',
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: false,
			notifications: ['Zoki sent you a partner request'],
			socials: [
				'facebook',
				'linkedin',
				'unsplash',
				'quora',
				'patreon',
				'pinterest',
				'youtube',
			],
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
			joined_on: 'October, 2020',
			coins: 45,
			occupation: 'Farm owner',
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: false,
			notifications: [],
			socials: [
				'reddit',
				'twitter',
				'facebook',
				'discord',
				'youtube',
				'whatsapp',
				'bitcoin',
			],
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
			joined_on: 'April, 2021',
			coins: 6,
			occupation: 'Unemployed',
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: false,
			notifications: ['Matija beat your bench press national record'],
			socials: ['youtube', 'whatsapp', 'tumblr'],
		},
		{
			username: 'markoc',
			fname: 'Marko',
			lname: 'Kubanić',
			age: 42,
			photo:
				'https://cachedimages.podchaser.com/256x256/aHR0cHM6Ly9jcmVhdG9yLWltYWdlcy5wb2RjaGFzZXIuY29tLzNmMWY5MThiNzc2NTQwNWI5NzdhMzQ5MzFjYzgwOGE0LmpwZWc%3D/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D',
			bio:
				"I still work hard to know my business. I'm continuously looking for ways to improve all my companies, and I'm always selling. Always.",
			country: 'USA',
			joined_on: 'April, 2021',
			coins: 695,
			occupation: 'Investor',
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: true,
			notifications: [
				'Marian liked your daily streak',
				'Matija responded to your latest todo',
				'Stan Svenovljević sent you a partner request and we automatically rejected it for you',
			],
			socials: [
				'twitter',
				'youtube',
				'reddit',
				'discord',
				'telegram',
				'personal',
				'bitcoin',
			],
		},
		{
			username: 'koralj11',
			fname: 'Koraljka Dunja',
			lname: 'Vinfrić-Jagodžić',
			age: 50,
			photo:
				'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed6730fc6ade40006ffd657%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D1080%26cropY1%3D0%26cropY2%3D1080',
			bio:
				'Duct tape is like the force. It has a light side, and it holds the world together.',
			country: 'Montenegro',
			joined_on: 'January, 2021',
			coins: 156,
			occupation: 'Cashier',
			// categories: [{ id: '', name: '' }],
			// badges: [{ id: '', name: '', timestamp: null }],
			rank: null,
			isPrivate: false,
			isPremium: true,
			notifications: [
				'You forgot te respond to your partner and we dedicted 10 coins from you',
				'You havent logged in for a while',
			],
			socials: [
				'twitter',
				'facebook',
				'youtube',
				'quora',
				'slack',
				'personal',
			],
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
		console.log('ID --- ', id);
		const user = context.getters.users.find((u) => u.username === id);
		return user;
	},
};
