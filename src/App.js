import { lazy, memo, Suspense, useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as Panelbear from '@panelbear/panelbear-js'
import { styled } from 'linaria/react'
import Faq from 'pages/Faq'
import Resources from 'pages/Resources'
import Search from 'pages/Search'

import EventProvider from 'context/EventContext'

const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Title = styled.h1`
	text-align: center;
	font-weight: bold;
	font-size: 2rem;
	color: white;
	margin: 12px 0 12px 48px;
	white-space: nowrap;

	@media (max-width: 750px) {
		display: none;
	}
`

const Nav = styled.div`
	/* flex: 1; */
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
		color: #328dc3;
	}
`

const Schedule = lazy(() => import('./pages/Schedule'))

const AppRoutes = {
	home: '',
	faq: 'faq',
	search: 'search',
	resources: 'resources',
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
		Panelbear.track(`Page-${location.hash}`)
	}, [location])

	return (
		<div className="wrapper">
			<Suspense fallback={<Loading />}>
				<Header>
					<Title>SWC 2022</Title>
					<Nav>
						<NavIcon to={AppRoutes.home} title="Home">
							<i className="fa-solid fa-house"></i>
						</NavIcon>
						<NavIcon to={AppRoutes.search} title="Search">
							<i className="fa-solid fa-magnifying-glass"></i>
						</NavIcon>
						<NavIcon to={AppRoutes.resources} title="Resources">
							<i className="fa-solid fa-link"></i>
						</NavIcon>
						<NavIcon to={AppRoutes.faq} title="FAQ">
							<i className="fa-solid fa-messages-question"></i>
						</NavIcon>
					</Nav>
				</Header>
				<EventProvider>
					<Routes>
						<Route path={AppRoutes.faq} element={<Faq />} />
						<Route path={AppRoutes.resources} element={<Resources />} />
						<Route path={AppRoutes.search} element={<Search />} />
						<Route path="*" element={<Schedule />} />
					</Routes>
				</EventProvider>
			</Suspense>
		</div>
	)
}

export default memo(App)
