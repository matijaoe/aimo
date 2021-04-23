import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

// `https://avatar.oxro.io/avatar.svg?name=${user.fname}${user.lname}&caps=1&fontSize=200&bold=true&background=${bgColor}&color=${textColor}`

export const state = () => ({
	users: [
		{
			username: 'matijao',
			fname: 'Matija',
			lname: 'Osrečki',
			countryCode: 'HRV',
			birthday: dayjs('1999-12-10'),
			joined_on: dayjs('2021-01-16'),

			photo:
				'https://avatar.oxro.io/avatar.svg?name=matija+osre%C4%8Dki&caps=1&fontSize=200&bold=true&background=A7F3D0&color=047857',
			occupation: 'Student',
			bio: 'Different strokes for different folkes 🍭',
			coins: 400,
			isPremium: true,
			categories: [
				'8MNLJ4yg15YoRch0t3NAG',
				'0TN9zbVVaZOhWswtztYYn',
				'VQDonT7_pB4ACAW6DZsiL',
			], // mogli bi ih automatski postavljat na temelju njegovih najcescih todosa
			socials: [
				{ id: 'twitter', url: 'https://www.google.com/' },
				{ id: 'linkedin', url: 'https://www.google.com/' },
				{ id: 'github', url: 'https://www.google.com/' },
				{ id: 'telegram', url: 'https://www.google.com/' },
				{ id: 'discord', url: 'https://www.google.com/' },
				{ id: 'dribbble', url: 'https://www.google.com/' },
				{ id: 'stack-overflow', url: 'https://www.google.com/' },
				{ id: 'medium', url: 'https://www.google.com/' },
				{ id: 'bitcoin', url: 'https://www.google.com/' },
			],
			todos: [
				{
					id: nanoid(),
					name: 'citati knjigu',
					desc: '', // optional
					categories: [
						'VQDonT7_pB4ACAW6DZsiL',
						'VquU1OBaiUo02JuSuZRO8',
					],
					timestamp: 1618916803496,
					done: false,
					approved: false,
					isDaily: true,
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
					approved: true,
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
					categories: [
						'0TN9zbVVaZOhWswtztYYn',
						'BR2eOYR1Y6u_Yp_H58xD1',
					],
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
					name: 'deadlift',
					desc: '', // optional
					categories: [
						'0TN9zbVVaZOhWswtztYYn',
						'BR2eOYR1Y6u_Yp_H58xD1',
					],
					timestamp: 1618916803496,
					done: true,
					approved: true,
					isDaily: false,
					favorite: true,
					important: false,
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
			notifications: [
				'Marian forgot to share his screen',
				'Tomo liked your streak',
				'You were voted best programmer on the platform 3rd month in a row',
				'Marian endorsed your Vue skills',
				'Koraljka liked your goals list',
				'Stan Svenovljević joined you in your monthly challenge',
				'Stan Svenovljević commented on your post',
			],
		},
		{
			username: 'marian7',
			fname: 'Marian',
			lname: 'Babić',
			countryCode: 'COL',
			birthday: dayjs('2000-11-01'),
			joined_on: dayjs('2021-11-04'),

			photo:
				'https://avatar.oxro.io/avatar.svg?name=marian+babić&caps=1&fontSize=200&bold=true&background=FBCFE8&color=BE185D',
			occupation: 'Student',
			bio: 'Ad sed sunt qui sunt vel.',
			coins: 234,
			isPremium: true,
			categories: [
				'0iUqkyVh0IliBfXtyOj7r',
				'8MNLJ4yg15YoRch0t3NAG',
				'0TN9zbVVaZOhWswtztYYn',
			],
			socials: [
				{ id: 'facebook', url: 'https://www.google.com/' },
				{ id: 'messenger', url: 'https://www.google.com/' },
				{ id: 'github', url: 'https://www.google.com/' },
				{ id: 'discord', url: 'https://www.google.com/' },
				{ id: 'whatsapp', url: 'https://www.google.com/' },
				{ id: 'stack-overflow', url: 'https://www.google.com/' },
				{ id: 'default', url: 'https://www.google.com/' },
			],
			todos: [],
		},
		{
			username: 'patrik_harmonika',
			fname: 'Patrik',
			lname: 'Slovic',
			countryCode: 'HR',
			birthday: dayjs('1994-05-20'),
			joined_on: dayjs('2020-09-27'),

			photo:
				'https://avatar.oxro.io/avatar.svg?name=Patrik+Slovic&caps=1&fontSize=200&bold=true&background=C7D2FE&color=4338CA',
			occupation: 'Musician',
			bio: 'Amet fugiat sequi.',
			coins: 643,
			isPremium: false,
			categories: [
				'jcE5bvcPrBYb2bstsEWgE',
				'xUMFQYg3iBJbptNBUqsCK',
				'Bzw_jJ7m-I6vuN4HaFsDv',
			],
			socials: [
				{ id: 'facebook', url: 'https://www.google.com/' },
				{ id: 'linkedin', url: 'https://www.google.com/' },
				{ id: 'unsplash', url: 'https://www.google.com/' },
				{ id: 'quora', url: 'https://www.google.com/' },
				{ id: 'patreon', url: 'https://www.google.com/' },
				{ id: 'pinterest', url: 'https://www.google.com/' },
				{ id: 'youtube', url: 'https://www.google.com/' },
			],
			todos: [],
		},
		{
			username: 'tomoKotar14',
			fname: 'Tomislav',
			lname: 'Mikšik',
			countryCode: 'BEL',
			birthday: dayjs('1995-07-21'),
			joined_on: dayjs('2021-03-01'),

			photo:
				'https://avatar.oxro.io/avatar.svg?name=Tomislav+Mikšik&caps=1&fontSize=200&bold=true&background=BAE6FD&color=0369A1',
			occupation: 'Influencer',
			bio: 'Explicabo doloribus aspernatur in.',
			coins: 110,
			isPremium: false,
			categories: ['4OgWmONbRqhKYtDJTjd0I', '0TN9zbVVaZOhWswtztYYn'],
			socials: [
				{ id: 'reddit', url: 'https://www.google.com/' },
				{ id: 'twitter', url: 'https://www.google.com/' },
				{ id: 'facebook', url: 'https://www.google.com/' },
				{ id: 'discord', url: 'https://www.google.com/' },
				{ id: 'youtube', url: 'https://www.google.com/' },
				{ id: 'whatsapp', url: 'https://www.google.com/' },
				{ id: 'bitcoin', url: 'https://www.google.com/' },
			],
			todos: [],
		},
		{
			username: 'lovedoctor',
			fname: 'Warren',
			lname: 'Lowe',
			countryCode: 'GAB',
			birthday: dayjs('1978-11-04'),
			joined_on: dayjs('2021-02-14'),
			photo:
				'https://avatar.oxro.io/avatar.svg?name=Warren+Lowe&caps=1&fontSize=200&bold=true&background=FEF08A&color=A16207',
			occupation: 'Doctor',
			bio: 'Nulla error omnis debitis libero id repellendus.',
			coins: 643,
			isPremium: false,
			categories: ['kmTtKxOMeKfuNoU_kG-yp'],
			socials: [
				{ id: 'facebook', url: 'https://www.google.com/' },
				{ id: 'patreon', url: 'https://www.google.com/' },
				{ id: 'unsplash', url: 'https://www.google.com/' },
				{ id: 'quora', url: 'https://www.google.com/' },
			],
			todos: [],
		},
		{
			username: 'blueface',
			fname: 'Stan',
			lname: 'Polo',
			countryCode: 'FRA',
			birthday: dayjs('1967-12-02'),
			joined_on: dayjs('2021-04-21'),
			photo:
				'https://avatar.oxro.io/avatar.svg?name=Stan+Polo&caps=1&fontSize=200&bold=true&background=BFDBFE&color=1D4ED8',
			occupation: 'Doctor',
			bio: 'Nulla error omnis debitis libero id repellendus.',
			coins: 23,
			isPremium: false,
			categories: ['8MNLJ4yg15YoRch0t3NAG'],
			socials: [
				{ id: 'twitter', url: 'https://www.google.com/' },
				{ id: 'messenger', url: 'https://www.google.com/' },
			],
			todos: [],
		},
		{
			username: 'wood42',
			fname: 'Joseph',
			lname: 'Woodward',
			countryCode: 'USA',
			birthday: dayjs('1991-07-07'),
			joined_on: dayjs('2020-12-11'),

			photo:
				'https://avatar.oxro.io/avatar.svg?name=Joseph+Woodward&caps=1&fontSize=200&bold=true&background=FED7AA&color=C2410C',
			occupation: 'Coach',
			bio: 'Corrupti qui quae quia commodi.',
			coins: 32,
			isPremium: false,
			categories: ['BR2eOYR1Y6u_Yp_H58xD1', '8MNLJ4yg15YoRch0t3NAG'],
			socials: [
				{ id: 'twitter', url: 'https://www.google.com/' },
				{ id: 'stack-overflow', url: 'https://www.google.com/' },
				{ id: 'medium', url: 'https://www.google.com/' },
				{ id: 'youtube', url: 'https://www.google.com/' },
			],
			todos: [],
		},
		{
			username: 'suzzy',
			fname: 'Suzanne',
			lname: 'Hunter',
			countryCode: 'TWN',
			birthday: dayjs('1988-01-09'),
			joined_on: dayjs('2021-04-10'),
			photo:
				'https://avatar.oxro.io/avatar.svg?name=Suzanne+Hunter&caps=1&fontSize=200&bold=true&background=FECACA&color=B91C1C',
			occupation: 'Fireman',
			bio: 'Velit ut ut aut ut magni esse.',
			coins: 643,
			isPremium: false,
			categories: ['VquU1OBaiUo02JuSuZRO8', 'uUCM7KHa7XlSzqpqX7iY3'],
			socials: [
				{ id: 'pinterest', url: 'https://www.google.com/' },
				{ id: 'messenger', url: 'https://www.google.com/' },
				{ id: 'whatsapp', url: 'https://www.google.com/' },
				{ id: 'tumblr', url: 'https://www.google.com/' },
				{ id: 'youtube', url: 'https://www.google.com/' },
			],
			todos: [],
		},
	],
});

export const getters = {
	users(state) {
		return state.users || [];
	},
	getUserById: (state, getters) => (username) => {
		return getters.users.find((user) => user.username === username);
	},
	getUserTodos: (state, getters) => (username) => {
		return getters.users.find((user) => user.username === username)?.todos;
	},
};

// export const mutations = {
// 	updateValue(state, payload) {
// 		state.value = payload;
// 	},
// };

export const actions = {};
