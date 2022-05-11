import { memo, Suspense, useEffect } from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as Panelbear from '@panelbear/panelbear-js'

import { RegisteredRoutes } from 'config/routes'
import Event from 'utils/events'

const AppRoutes = () => {
	let location = useLocation()

	useEffect(() => {
		Panelbear.track(`${Event.PageRender}-${location.pathname.replace('/', '')}`)
	}, [location])

	return (
		<RouterRoutes>
			{RegisteredRoutes.map(l => {
				const path = l.path === '' ? '*' : l.path
				const Comp = l.component
				return (
					<Route
						key={path}
						path={path}
						element={
							<Suspense fallback={l.fallback}>
								<Comp />
							</Suspense>
						}
					/>
				)
			})}
		</RouterRoutes>
	)
}

export default memo(AppRoutes)
