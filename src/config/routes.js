import { lazy } from 'react'

const V2 = lazy(() => import('../pages/V2'))
const Schedule = lazy(() => import('../pages/Schedule'))
const Faq = lazy(() => import('../pages/Faq'))
const Favorites = lazy(() => import('../pages/Favorites'))
const Resources = lazy(() => import('../pages/Resources'))
const Search = lazy(() => import('../pages/Search'))
const Login = lazy(() => import('../pages/Login'))

// Change to conform to API?
// https://reactrouter.com/docs/en/v6/api#useroutes

const Routes = {
	Home: {
		path: '',
		component: <V2 />,
		icon: 'fa-calendar-days',
		title: 'Home',
	},
	FAQ: {
		path: 'faq',
		component: <Faq />,
		icon: 'fa-messages-question',
		title: 'FAQ',
	},
	Search: {
		path: 'search',
		component: <Search />,
		icon: 'fa-magnifying-glass',
		title: 'Search',
	},
	Resources: {
		path: 'resources',
		component: <Resources />,
		icon: 'fa-link',
		title: 'Resources',
	},
	Favorites: {
		path: 'favorites',
		component: <Favorites />,
		icon: 'fa-heart',
		title: 'Favorites',
	},
	Login: {
		path: 'login',
		component: <Login />,
		icon: 'fa-right-to-bracket',
		title: 'Login',
	},
	Logout: {
		icon: 'fa-right-from-bracket',
		title: 'Logout',
	},
	User: {
		path: 'login',
		component: <Login />,
		icon: 'fa-user-astronaut',
		title: 'User Info',
	},
	Old: {
		path: 'old',
		component: <Schedule />,
		icon: 'fa-skull',
		title: 'Old Schedule',
	},
}

export default Routes
