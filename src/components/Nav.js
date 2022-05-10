import { memo, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth, useSigninCheck } from 'reactfire'
import { styled } from 'linaria/react'

import Route from 'config/routes'
import colors from 'utils/colors'

const Nav = styled.div`
	margin: 16px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	display: flex;
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

const AuthNavIcon = memo(() => {
	const { status, data: signInCheckResult } = useSigninCheck()
	const auth = useAuth()

	const handleLogout = useCallback(() => {
		auth.signOut().then(() => console.log('signed out'))
	}, [auth])

	if (status === 'loading') return null

	if (signInCheckResult.signedIn) {
		return (
			<>
				<NavIcon to={Route.User.path} title={Route.User.title} key="nav-user">
					<i className={`fa-solid ${Route.User.icon}`}></i>
				</NavIcon>
				<NavIcon to={Route.Logout.path} title={Route.Logout.title} as="span" onClick={handleLogout}>
					<i className={`fa-solid ${Route.Logout.icon}`}></i>
				</NavIcon>
			</>
		)
	}

	return (
		<NavIcon to={Route.Login.path} title={Route.Login.title} key="nav-login">
			<i className={`fa-solid ${Route.Login.icon}`}></i>
		</NavIcon>
	)
})

const NavBar = () => {
	const navRoutes = [Route.Home, /*Route.V2,*/ Route.Search, Route.Favorites, Route.Resources, Route.FAQ]
	return (
		<Nav>
			{navRoutes.map(r => (
				<NavIcon to={r.path} title={r.title} key={r.title}>
					<i className={`fa-solid ${r.icon}`}></i>
				</NavIcon>
			))}
			{/* <AuthNavIcon /> */}
		</Nav>
	)
}

export default memo(NavBar)
