export default function ({ app, route, redirect }) {
	if (route.path !== '/auth') {
		// we are on a protected route
		if (!app.$fire.auth.currentUser) {
			// take them to sign in page
			return redirect('/auth');
		}
	} else if (route.path === '/auth') {
		if (!app.$fire.auth.currentUser) {
			// leave them on the sign in page
		} else {
			return redirect('/');
		}
	}
}
