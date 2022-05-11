import { memo, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth, useSigninCheck } from 'reactfire'
import { styled } from 'linaria/react'

import Routes, { NavRoutes } from 'config/routes'

const Nav = styled.div`
	margin: 16px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	display: flex;
`

const NavIcon = styled(NavLink)`
	color: var(--link);
	font-size: 24px;
	margin-left: 16px;
	margin-right: 16px;

	&:hover {
		color: var(--linkHover);
	}
	&.active {
		color: var(--linkActive);
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
				<NavIcon to={Routes.User.path} title={Routes.User.title} key="nav-user">
					<i className={`fa-solid ${Routes.User.icon}`}></i>
				</NavIcon>
				<NavIcon to={Routes.Logout.path} title={Routes.Logout.title} as="span" onClick={handleLogout}>
					<i className={`fa-solid ${Routes.Logout.icon}`}></i>
				</NavIcon>
			</>
		)
	}

	return (
		<NavIcon to={Routes.Login.path} title={Routes.Login.title} key="nav-login">
			<i className={`fa-solid ${Routes.Login.icon}`}></i>
		</NavIcon>
	)
})

const NavBar = () => {
	return (
		<Nav>
			{NavRoutes.map(r => (
				<NavIcon to={r.path} title={r.title} key={r.title}>
					<i className={`fa-solid ${r.icon}`}></i>
				</NavIcon>
			))}
			<AuthNavIcon />
		</Nav>
	)
}

export default memo(NavBar)
