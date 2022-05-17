import { lazy } from 'react'

const LazyPreload = importStatement => {
	const Component = lazy(importStatement)
	Component.preload = importStatement
	return Component
}

const Schedule = LazyPreload(() => import('../pages/Schedule'))
const Faq = LazyPreload(() => import('../pages/Faq'))
const Favorites = LazyPreload(() => import('../pages/UserFavorites'))
const Search = LazyPreload(() => import('../pages/Search'))
const Login = LazyPreload(() => import('../pages/Login'))
const Temp = LazyPreload(() => import('../pages/Temp'))
const EventDetails = LazyPreload(() => import('../pages/EventDetails'))
const VenueDetails = LazyPreload(() => import('../pages/VenueDetails'))
const FavoritesList = LazyPreload(() => import('../pages/FavoritesList'))
const Vendors = LazyPreload(() => import('../pages/Vendors'))
const Tattoos = LazyPreload(() => import('../pages/Tattoos'))

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
	Temp: {
		path: '/temp',
		component: Temp,
		icon: 'fa-flask-vial',
		title: 'Temp Test',
	},
	EventDetails: {
		path: '/event/:id',
		component: EventDetails,
		title: 'Event Details',
	},
	VenueDetails: {
		path: '/venue/:venue',
		component: VenueDetails,
		title: 'Venue Details',
	},
	FavoritesList: {
		path: '/favorites/:uid',
		component: FavoritesList,
		title: 'User Favorites',
	},
	Vendors: {
		path: '/vendors',
		component: Vendors,
		icon: 'fa-store',
		title: 'Vendors',
	},
	Tattoos: {
		path: '/tattoos',
		component: Tattoos,
		icon: 'fa-skull',
		title: 'Tattoos',
	},
	Map: {
		path: '/map',
		component: () => <div>MAP</div>,
		icon: 'fa-map',
		title: 'Map',
	},
}

export const RegisteredRoutes = [
	Routes.FAQ,
	Routes.Favorites,
	Routes.Search,
	Routes.Login,
	Routes.Temp,
	Routes.EventDetails,
	Routes.VenueDetails,
	Routes.FavoritesList,
	Routes.Vendors,
	Routes.Tattoos,
	Routes.Map,
	Routes.Home,
]

export const NavRoutes = [
	Routes.Home,
	Routes.Search,
	Routes.Favorites,
	Routes.Vendors,
	...(process.env.NODE_ENV === 'development' ? [Routes.Temp, Routes.Map, Routes.Tattoos] : []),
	Routes.FAQ,
]

export const preloadRouteComponent = component => {
	if (component && component.preload) {
		component.preload()
	}
}

export default Routes
