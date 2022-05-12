import { lazy } from 'react'

const LazyPreload = importStatement => {
	const Component = lazy(importStatement)
	Component.preload = importStatement
	return Component
}

const Schedule = LazyPreload(() => import('../pages/Schedule'))
const Faq = LazyPreload(() => import('../pages/Faq'))
const Favorites = LazyPreload(() => import('../pages/Favorites'))
const Resources = LazyPreload(() => import('../pages/Resources'))
const Search = LazyPreload(() => import('../pages/Search'))
const Login = LazyPreload(() => import('../pages/Login'))
const EventDetails = LazyPreload(() => import('../pages/EventDetails'))

// Change to conform to API?
// https://reactrouter.com/docs/en/v6/api#useroutes

const Routes = {
	Home: {
		path: '',
		component: Schedule,
		icon: 'fa-calendar-days',
		title: 'Home',
	},
	FAQ: {
		path: '/faq',
		component: Faq,
		icon: 'fa-messages-question',
		title: 'FAQ',
	},
	Search: {
		path: '/search',
		component: Search,
		icon: 'fa-magnifying-glass',
		title: 'Search',
	},
	Resources: {
		path: '/resources',
		component: Resources,
		icon: 'fa-link',
		title: 'Resources',
	},
	Favorites: {
		path: '/favorites',
		component: Favorites,
		icon: 'fa-heart',
		title: 'Favorites',
	},
	Login: {
		path: '/login',
		component: Login,
		icon: 'fa-right-to-bracket',
		title: 'Login',
	},
	Logout: {
		icon: 'fa-right-from-bracket',
		title: 'Logout',
	},
	User: {
		path: '/login',
		component: Login,
		icon: 'fa-user-astronaut',
		title: 'User Info',
	},
	EventDetails: {
		path: '/event/:id',
		component: EventDetails,
	},
}

export const RegisteredRoutes = [
	Routes.FAQ,
	Routes.Favorites,
	Routes.Resources,
	Routes.Search,
	Routes.Login,
	Routes.EventDetails,
	Routes.Home,
]

export const NavRoutes = [Routes.Home, Routes.Search, Routes.Favorites, Routes.Resources, Routes.FAQ]

export default Routes
