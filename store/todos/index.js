// Ovo nije prava struktura od todosa nego samo za mockup
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
			approved: false,
			favorite: true,
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
			approved: false,
			favorite: true,
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
			approved: false,
			favorite: false,
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
			approved: false,
			favorite: false,
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
			approved: false,
			favorite: false,
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
			approved: false,
			favorite: false,
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
};
