export const state = () => ({
	userId: 'matijao',
	socials: [
		{ id: 'behance', name: 'behance' },
		{ id: 'bitcoin', name: 'bitcoin' },
		{ id: 'codepen', name: 'codepen' },
		{ id: 'default', name: 'default' },
		{ id: 'discord', name: 'discord' },
		{ id: 'dribbble', name: 'dribbble' },
		{ id: 'facebook', name: 'facebook' },
		{ id: 'github', name: 'github' },
		{ id: 'instagram', name: 'instagram' },
		{ id: 'linkedin', name: 'linkedin' },
		{ id: 'medium', name: 'medium' },
		{ id: 'messenger', name: 'messenger' },
		{ id: 'patreon', name: 'patreon' },
		{ id: 'pinterest', name: 'pinterest' },
		{ id: 'quora', name: 'quora' },
		{ id: 'reddit', name: 'reddit' },
		{ id: 'slack', name: 'slack' },
		{ id: 'stack-overflow', name: 'stack-overflow' },
		{ id: 'telegram', name: 'telegram' },
		{ id: 'tumblr', name: 'tumblr' },
		{ id: 'twitter', name: 'twitter' },
		{ id: 'unsplash', name: 'unsplash' },
		{ id: 'whatsapp', name: 'whatsapp' },
		{ id: 'youtube', name: 'youtube' },
	],
	// todo - switch to firebase ids
	categories: [
		{ id: 'OWEhqyLlnnWQGEUAHzGhe', name: 'study', color: 'blue' },
		{ id: 'QJNdchJLDfKZcR-O3ytn3', name: 'school', color: 'red' },
		{ id: '8MNLJ4yg15YoRch0t3NAG', name: 'coding', color: 'emerald' },
		{ id: 'VQDonT7_pB4ACAW6DZsiL', name: 'reading', color: 'indigo' },
		{ id: 'BR2eOYR1Y6u_Yp_H58xD1', name: 'fitness', color: 'lightBlue' },
		{ id: '0TN9zbVVaZOhWswtztYYn', name: 'workout', color: 'cyan' },
		{ id: 'uUCM7KHa7XlSzqpqX7iY3', name: 'health', color: 'rose' },
		{ id: 'VquU1OBaiUo02JuSuZRO8', name: 'midfulness', color: 'orange' },
		{ id: '0iUqkyVh0IliBfXtyOj7r', name: 'social', color: 'pink' },
		{ id: 'Bzw_jJ7m-I6vuN4HaFsDv', name: 'fun', color: 'violet' },
		{ id: 'xUMFQYg3iBJbptNBUqsCK', name: 'nature', color: 'green' },
		{ id: 'jcE5bvcPrBYb2bstsEWgE', name: 'music', color: 'yellow' },
		{ id: 'kmTtKxOMeKfuNoU_kG-yp', name: 'art', color: 'amber' },
		{ id: '4OgWmONbRqhKYtDJTjd0I', name: 'sports', color: 'teal' },
		{ id: 'wuH147eN-7R2g4EeJrB09', name: 'skills', color: 'red' },
	],
});

export const getters = {
	currentUserId(state) {
		return state.userId;
	},
	currentUser(state, getters) {
		return getters['users/getUserById'](getters.currentUserId);
	},
	currentUserPartners(state, getters) {
		return getters['partners/getPartnersById'](getters.currentUserId) || [];
	},
	categories(state) {
		return state.categories;
	},
	getCategoryById: (state, getters) => (catId) => {
		return getters.categories.find((cat) => cat.id === catId);
	},
	socials(state) {
		return state.socials;
	},
	getSocialById: (state, getters) => (socId) => {
		return getters.socials.find((cat) => cat.id === socId);
	},
};

export const mutations = {};

export const actions = {};
