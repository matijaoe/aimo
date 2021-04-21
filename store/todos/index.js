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
});

export const getters = {
	allTodos(state) {
		return state.todos;
	},
	getTodoById: (state, getters) => (id) => {
		return getters.allTodos.find((todo) => todo.id === id);
	},
	getFavoriteTodos(state, getters) {
		return getters.allTodos.filter((todo) => todo.favorite);
	},
	getTodosByPartner: (state, getters) => (username) => {
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
