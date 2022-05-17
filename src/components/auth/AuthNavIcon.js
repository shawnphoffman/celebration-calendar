import { memo, useCallback } from 'react'
import { useAuth, useSigninCheck } from 'reactfire'
import * as Panelbear from '@panelbear/panelbear-js'

import { NavIcon } from 'components/styles'
import Routes, { preloadRouteComponent } from 'config/routes'
import Event from 'utils/events'

export const AuthNavIcon = memo(() => {
	const { status, data: signInCheckResult } = useSigninCheck()
	const auth = useAuth()

	const handleLogout = useCallback(() => {
		auth.signOut().then(() => {
			Panelbear.track(Event.LogOut)
			console.log('signed out')
		})
	}, [auth])

	if (status === 'loading') return null

	if (signInCheckResult.signedIn) {
		return (
			<>
				<NavIcon
					to={Routes.User.path}
					title={Routes.User.title}
					key="nav-user"
					onMouseEnter={() => preloadRouteComponent(Routes.Login.component)}
				>
					<i className={`fa-regular ${Routes.User.icon}`}></i>
				</NavIcon>
				<NavIcon to={Routes.Logout.path} title={Routes.Logout.title} as="span" onClick={handleLogout}>
					<i className={`fa-solid ${Routes.Logout.icon}`}></i>
				</NavIcon>
			</>
		)
	}

	return (
		<NavIcon
			to={Routes.Login.path}
			title={Routes.Login.title}
			key="nav-login"
			onMouseEnter={() => preloadRouteComponent(Routes.Login.component)}
		>
			<i className={`fa-solid ${Routes.Login.icon}`}></i>
		</NavIcon>
	)
})
