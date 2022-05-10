import { lazy, memo, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as Panelbear from '@panelbear/panelbear-js'
import Login from 'pages/Login'
import Data from 'pages/TestData'

import Event from 'utils/events'

import V2 from '../pages/V2'
import routes from './Routes'

// TODO - Preload dynamic imports!!!
const Schedule = lazy(() => import('../pages/Schedule'))
const Faq = lazy(() => import('../pages/Faq'))
const Favorites = lazy(() => import('../pages/Favorites'))
const Resources = lazy(() => import('../pages/Resources'))
const Search = lazy(() => import('../pages/Search'))

const AppRoutes = () => {
	let location = useLocation()

	useEffect(() => {
		Panelbear.track(`${Event.PageRender}-${location.pathname.replace('/', '')}`)
	}, [location])

	return (
		<Routes>
			<Route
				path={routes.faq}
				element={
					<Suspense fallback={null}>
						<Faq />
					</Suspense>
				}
			/>
			<Route
				path={routes.favorites}
				element={
					<Suspense fallback={null}>
						<Favorites />
					</Suspense>
				}
			/>
			<Route
				path={routes.resources}
				element={
					<Suspense fallback={null}>
						<Resources />
					</Suspense>
				}
			/>
			<Route
				path={routes.search}
				element={
					<Suspense fallback={null}>
						<Search />
					</Suspense>
				}
			/>
			<Route path={routes.login} element={<Login />} />
			<Route path={'data'} element={<Data />} />
			<Route path={routes.v2} element={<V2 />} />
			<Route
				path="*"
				element={
					<Suspense fallback={null}>
						<Schedule />
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default memo(AppRoutes)
