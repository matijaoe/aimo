// Ovo nije prava struktura od todosa nego samo za mockup
export const state = () => ({
	todos: [
		{
			id: 'todo1',
			title: 'Programiranje',
			partner: 'matijaVue',
			desc: 'Programiramo cijele dane ko muhe bez glave', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: false,
			timestamp: null,
			approved: false,
			likes: [],
			comments: [],
		},
		{
			id: 'todo2',
			title: 'Gledanje YT videozapisa od autora Ivan Pavlović',
			partner: 'patrikHarmonika',
			desc: 'Fanboys od kralja Ivana Pavlovića najjačeg lika na Balaknu.', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: false,
			timestamp: null,
			approved: false,
			likes: [],
			comments: [],
		},
		{
			id: 'todo3',
			title: 'Vježbanje',
			partner: 'tomoKotar',
			desc: 'Želimo do ljeta izgledat kao da su nas bogovi klesali', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: false,
			timestamp: null,
			approved: false,
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
			timestamp: null,
			approved: false,
			likes: [],
			comments: [],
		},
		{
			id: 'todo5',
			title: 'Video Call i pričanje o životu',
			partner: 'matijaVue',
			desc: 'Pričamo doslovno o svem. I vrijeme leti.', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: false,
			timestamp: null,
			approved: false,
			likes: [],
			comments: [],
		},
		{
			id: 'todo6',
			title: 'Boks',
			partner: 'tomoKotar',
			desc: '12 rundi po 3 minute', // optional
			urgency: '',
			categories: [{ id: '', name: '' }],
			isDaily: true,
			timestamp: null,
			approved: false,
			likes: [],
			comments: [],
		},
	],
});

export const getters = {
	allTodos(state) {
		return state.todos;
	},
};
