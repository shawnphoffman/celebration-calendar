import { memo, Suspense, useEffect } from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as Panelbear from '@panelbear/panelbear-js'

import Routes from 'config/routes'
import Event from 'utils/events'

const appLinks = [Routes.FAQ, Routes.Favorites, Routes.Resources, Routes.Search, Routes.Login, Routes.V2, Routes.Home]

const AppRoutes = () => {
	let location = useLocation()

	useEffect(() => {
		Panelbear.track(`${Event.PageRender}-${location.pathname.replace('/', '')}`)
	}, [location])

	return (
		<RouterRoutes>
			{appLinks.map(l => {
				const path = l.path === '' ? '*' : l.path
				return <Route key={path} path={path} element={<Suspense fallback={l.fallback}>{l.component}</Suspense>} />
			})}
		</RouterRoutes>
	)
}

export default memo(AppRoutes)
