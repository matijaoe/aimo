// Ovo nije prava struktura od todosa nego samo za mockup
import { nanoid } from 'nanoid';
export const state = () => ({
	todos: [
		{
			id: 'todo1',
			title: 'Programiranje',
			partner: 'matijao',
			desc: 'Programiramo cijele dane ko muhe bez glave', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: true,
			timestamp: new Date(2021, 4, 12),
			status: 'reviewed',
			favorite: true,
			interactions: [
				{
					id: nanoid(),
					type: 'review',
					date: new Date(2021, 3, 7, 18, 7),
					info: 'Partner reviewed you engagement!',
					score: '5', // opcionalno
				},
				{
					id: nanoid(),
					type: 'engagement',
					date: new Date(2021, 3, 6, 7, 11),
					info: 'You updated your engagement!',
					photo: 'opt', // opcionalno
				},
				{
					id: nanoid(),
					type: 'approved',
					date: new Date(2021, 3, 5, 11, 43),
					info: 'Your partner agreed to do this todo with you!',
				},
				{
					id: nanoid(),
					type: 'created',
					date: new Date(2021, 3, 4, 13, 34),
					info: 'You started this todo!',
				},
			],
			likes: [],
			comments: [],
		},
		{
			id: 'todo2',
			title: 'Gledanje YT videozapisa od autora Ivan Pavlović',
			partner: 'patrik_harmonika',
			desc: 'Fanboys od kralja Ivana Pavlovića najjačeg lika na Balaknu.', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: false,
			timestamp: new Date(2021, 5, 11),
			status: 'approved',
			favorite: false,
			interactions: [
				{
					id: nanoid(),
					type: 'approved',
					date: new Date(2021, 2, 7, 12, 4),
					info: 'Your partner agreed to do this todo with you!',
				},
				{
					id: nanoid(),
					type: 'created',
					date: new Date(2021, 2, 4, 2, 22),
					info: 'You started this todo!',
				},
			],
			likes: [],
			comments: [],
		},
		{
			id: 'todo3',
			title: 'Vježbanje',
			partner: 'tomoKotar14',
			desc: 'Želimo do ljeta izgledat kao da su nas bogovi klesali', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: false,
			timestamp: new Date(2021, 3, 22),
			status: 'created',
			favorite: false,
			interactions: [
				{
					id: nanoid(),
					type: 'created',
					date: new Date(2021, 3, 17, 18, 7),
					info: 'You started this todo!',
				},
			],
			likes: [],
			comments: [],
		},
		{
			id: 'todo4',
			title: 'Šetanje psa',
			partner: '',
			desc: 'Šetanje psa svaki dan!', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: false,
			timestamp: new Date(2021, 3, 30),
			status: 'engagement submitted',
			favorite: false,
			interactions: [
				{
					id: nanoid(),
					type: 'engagement',
					date: new Date(2021, 3, 9, 19, 55),
					info: 'You updated your engagement!',
					photo: 'opt', // opcionalno
				},
				{
					id: nanoid(),
					type: 'created',
					date: new Date(2021, 2, 5, 1, 28),
					info: 'You started this todo!',
				},
			],
			likes: [],
			comments: [],
		},
		{
			id: 'todo5',
			title: 'Video Call i pričanje o životu',
			partner: 'matijao',
			desc: 'Pričamo doslovno o svem. I vrijeme leti.', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: false,
			timestamp: new Date(2021, 4, 7),
			status: 'approved',
			favorite: false,
			interactions: [
				{
					id: nanoid(),
					type: 'approved',
					date: new Date(2021, 3, 17, 16, 24),
					info: 'Your partner agreed to do this todo with you!',
				},
				{
					id: nanoid(),
					type: 'created',
					date: new Date(2021, 3, 17, 16, 22),
					info: 'You started this todo!',
				},
			],
			likes: [],
			comments: [],
		},
		{
			id: 'todo6',
			title: 'Boks',
			partner: 'tomoKotar14',
			desc: '12 rundi po 3 minute', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: true,
			timestamp: new Date(2021, 4, 25),
			status: 'reviewed',
			favorite: true,
			interactions: [
				{
					id: nanoid(),
					type: 'review',
					date: new Date(2021, 3, 1, 21, 36),
					info: 'Partner reviewed you engagement!',
					score: '5', // opcionalno
				},
				{
					id: nanoid(),
					type: 'engagement',
					date: new Date(2021, 2, 6, 8, 32),
					info: 'You updated your engagement!',
					photo: 'opt', // opcionalno
				},
				{
					id: nanoid(),
					type: 'approved',
					date: new Date(2021, 2, 4, 14, 56),
					info: 'Your partner agreed to do this todo with you!',
				},
				{
					id: nanoid(),
					type: 'created',
					date: new Date(2021, 2, 1, 1, 3),
					info: 'You started this todo!',
				},
			],
			likes: [],
			comments: [],
		},
	],
	todos2: [
		{
			id: nanoid(),
			name: 'citati knjigu',
			desc: '', // optional
			categories: ['VQDonT7_pB4ACAW6DZsiL', 'VquU1OBaiUo02JuSuZRO8'],
			timestamp: 1618916803496,
			done: false,
			approved: false,
			isDaily: false,
			favorite: false,
			important: true,
			partner: 'patrik_harmonika',
		},
		{
			id: nanoid(),
			name: 'odvoziti bicikl',
			desc: '', // optional
			categories: [
				'BR2eOYR1Y6u_Yp_H58xD1',
				'xUMFQYg3iBJbptNBUqsCK',
				'uUCM7KHa7XlSzqpqX7iY3',
			],
			timestamp: 1618916803496,
			done: true,
			approved: false,
			isDaily: false,
			favorite: false,
			important: true,
			partner: 'marian7',
		},
		{
			id: nanoid(),
			name: 'random task',
			desc: '', // optional
			categories: [],
			timestamp: 1618916803496,
			done: true,
			approved: false,
			isDaily: false,
			favorite: true,
			important: false,
			partner: null,
		},
		{
			id: nanoid(),
			name: 'napraviti pripremu iz Bazi Podataka',
			desc: '', // optional
			categories: [
				'OWEhqyLlnnWQGEUAHzGhe',
				'QJNdchJLDfKZcR-O3ytn3',
				'8MNLJ4yg15YoRch0t3NAG',
			],
			timestamp: 1618916803496,
			done: false,
			approved: false,
			isDaily: false,
			favorite: false,
			important: false,
			partner: 'tomoKotar14',
		},
		{
			id: nanoid(),
			name: 'bicep curls',
			desc: '', // optional
			categories: ['0TN9zbVVaZOhWswtztYYn', 'BR2eOYR1Y6u_Yp_H58xD1'],
			timestamp: 1618916803496,
			done: false,
			approved: false,
			isDaily: false,
			favorite: true,
			important: true,
			partner: 'marian7',
		},
		{
			id: nanoid(),
			name: 'pogledati utakmicu',
			desc: '', // optional
			categories: [
				'Bzw_jJ7m-I6vuN4HaFsDv',
				'4OgWmONbRqhKYtDJTjd0I',
				'0iUqkyVh0IliBfXtyOj7r',
			],
			timestamp: 1618916803496,
			done: false,
			approved: false,
			isDaily: false,
			favorite: false,
			important: false,
			partner: null,
		},
		{
			id: nanoid(),
			name: 'gasirat',
			desc: '', // optional
			categories: [],
			timestamp: 1618916803496,
			done: false,
			approved: false,
			isDaily: true,
			favorite: true,
			important: false,
			partner: 'blueface',
		},
		{
			id: nanoid(),
			name: 'nacrtati brodić i more',
			desc: '', // optional
			categories: ['kmTtKxOMeKfuNoU_kG-yp'],
			timestamp: 1618916803496,
			done: true,
			approved: false,
			isDaily: false,
			favorite: false,
			important: false,
			partner: 'lovedoctor',
		},
	],
});

export const getters = {
	allTodos(state) {
		return state.todos2;
	},
	getTodoById: (state, getters) => (id) => {
		return getters.allTodos.find((todo) => todo.id === id);
	},
	getFavoriteTodos(state, getters) {
		return getters.allTodos.filter((todo) => todo.favorite);
	},
	importantTodos(state, getters) {
		return getters.allTodos.filter((todo) => todo.important);
	},
	completedTodos(state, getters) {
		return getters.allTodos.filter((todo) => todo.done);
	},
	approvedTodos(state, getters) {
		return getters.allTodos.filter((todo) => todo.approved);
	},
	dailyTodos(state, getters) {
		return getters.allTodos.filter((todo) => todo.isDaily);
	},
	personalTodos(state, getters) {
		return getters.allTodos.filter((todo) => !todo.partner);
	},
	activePartnersUsername(state, getters) {
		return getters.allTodos
			.filter((todo) => todo.partner)
			.map((todo) => todo.partner)
			.filter((value, index, self) => self.indexOf(value) === index);
	},
	todosByPartner: (state, getters) => (username) => {
		return getters.allTodos.filter((todo) => todo.partner === username);
	},
	getTodosByStatus: (state, getters) => (status) => {
		return getters.allTodos.filter((todo) => todo.status === status);
	},
	getTodoInteractions: (state, getters) => (id) => {
		return getters.getTodoById(id).interactions;
	},
};

export const actions = {
	changeFavorite(context, payload) {
		context.commit('setFavoriteStatus', payload);
	},
};

export const mutations = {
	setFavoriteStatus(state, payload) {
		state.todos.find((todo) => todo.id === payload.id).favorite =
			payload.favorite;
	},
};
