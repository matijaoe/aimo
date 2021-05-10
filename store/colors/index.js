export const state = () => ({
	colors: [
		{
			name: 'red',
			bg: 'FECACA',
			text: 'B91C1C',
		},
		{
			name: 'orange',
			bg: 'FED7AA',
			text: 'C2410C',
		},
		{
			name: 'amber',
			bg: 'FDE68A',
			text: 'B45309',
		},
		{
			name: 'yellow',
			bg: 'FEF08A',
			text: 'A16207',
		},
		{
			name: 'lime',
			bg: 'D9F99D',
			text: '4D7C0F',
		},
		{
			name: 'green',
			bg: 'BBF7D0',
			text: '15803D',
		},
		{
			name: 'emerald',
			bg: 'A7F3D0',
			text: '047857',
		},
		{
			name: 'teal',
			bg: '99F6E4',
			text: '0F766E',
		},
		{
			name: 'cyan',
			bg: 'A5F3FC',
			text: '0E7490',
		},
		{
			name: 'lightBlue',
			bg: 'BAE6FD',
			text: '0369A1',
		},
		{
			name: 'blue',
			bg: 'BFDBFE',
			text: '1D4ED8',
		},
		{
			name: 'indigo',
			bg: 'C7D2FE',
			text: '4338CA',
		},
		{
			name: 'violet',
			bg: 'DDD6FE',
			text: '6D28D9',
		},
		{
			name: 'purple',
			bg: 'E9D5FF',
			text: '7E22CE',
		},
		{
			name: 'fuchsia',
			bg: 'F5D0FE',
			text: 'A21CAF',
		},
		{
			name: 'pink',
			bg: 'FBCFE8',
			text: 'BE185D',
		},
		{
			name: 'rose',
			bg: 'FECDD3',
			text: 'BE123C',
		},
	],
});

export const getters = {
	getRandomColor(state) {
		const num = Math.floor(Math.random() * state.colors.length);
		return state.colors[num];
	},
};
