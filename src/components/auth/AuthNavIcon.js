import { memo } from 'react'
import { useSigninCheck } from 'reactfire'

import { NavIcon } from 'components/styles'
import Routes, { preloadRouteComponent } from 'config/routes'

export const AuthNavIcon = memo(() => {
	const { status, data: signInCheckResult } = useSigninCheck()

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
