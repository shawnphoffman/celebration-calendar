import { lazy, memo, Suspense, useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as Panelbear from '@panelbear/panelbear-js'
import { styled } from 'linaria/react'

import EventProvider from 'context/EventContext'
import FavoritesProvider from 'context/FavoritesContext'
import colors from 'utils/colors'

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	align-items: center;
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 0;
`

const Title = styled.h1`
	text-align: center;
	font-weight: bold;
	font-size: 2rem;
	color: white;
	margin: 12px 0 12px 48px;
	white-space: nowrap;
`

const Nav = styled.div`
	margin: 16px;
	flex-direction: row;
	align-items: center;
`

const NavIcon = styled(NavLink)`
	color: white;
	font-size: 24px;
	margin-left: 16px;
	margin-right: 16px;

	&:hover {
		color: ${colors.iconHover};
	}
	&.active {
		color: ${colors.blue};
	}
`

const Schedule = lazy(() => import('./pages/Schedule'))
// const ScheduleNew = lazy(() => import('./pages/ScheduleNew'))
const Faq = lazy(() => import('./pages/Faq'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Resources = lazy(() => import('./pages/Resources'))
const Search = lazy(() => import('./pages/Search'))

const AppRoutes = {
	home: '',
	faq: 'faq',
	search: 'search',
	resources: 'resources',
	favorites: 'favorites',
}

const Loading = memo(() => {
	return (
		<Header>
			<Title>Loading...</Title>
		</Header>
	)
})

function App() {
	let location = useLocation()

	useEffect(() => {
		Panelbear.track(`Page-${location.pathname.replace('/', '')}`)
	}, [location])

	return (
		<AppWrapper>
			<Suspense fallback={<Loading />}>
				<Header>
					<Nav>
						<NavIcon to={AppRoutes.home} title="Home">
							<i className="fa-solid fa-house"></i>
						</NavIcon>
						<NavIcon to={AppRoutes.search} title="Search">
							<i className="fa-solid fa-magnifying-glass"></i>
						</NavIcon>
						<NavIcon to={AppRoutes.favorites} title="Favorites">
							<i className="fa-solid fa-heart"></i>
						</NavIcon>
						<NavIcon to={AppRoutes.resources} title="Resources">
							<i className="fa-solid fa-link"></i>
						</NavIcon>
						<NavIcon to={AppRoutes.faq} title="FAQ">
							<i className="fa-solid fa-messages-question"></i>
						</NavIcon>
						{/* {process.env.NODE_ENV !== 'production' && (
							<NavIcon to="v2">
								<i className="fa-solid fa-circle-2"></i>
							</NavIcon>
						)} */}
					</Nav>
				</Header>
				<EventProvider>
					<FavoritesProvider>
						<Routes>
							<Route path={AppRoutes.faq} element={<Faq />} />
							<Route path={AppRoutes.favorites} element={<Favorites />} />
							<Route path={AppRoutes.resources} element={<Resources />} />
							<Route path={AppRoutes.search} element={<Search />} />
							{/* <Route path="v2" element={<ScheduleNew />} /> */}
							<Route path="*" element={<Schedule />} />
						</Routes>
					</FavoritesProvider>
				</EventProvider>
			</Suspense>
		</AppWrapper>
	)
}

export default memo(App)
