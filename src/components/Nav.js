import { memo, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth, useSigninCheck } from 'reactfire'
import { styled } from 'linaria/react'

import colors from 'utils/colors'

import routes from './Routes'

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

const AuthNavIcon = () => {
	const { status, data: signInCheckResult } = useSigninCheck()
	const auth = useAuth()

	const handleLogout = useCallback(() => {
		auth.signOut().then(() => console.log('signed out'))
	}, [auth])

	if (status === 'loading') return null

	if (signInCheckResult.signedIn) {
		return (
			<>
				<NavIcon to={routes.login} title="User" key="nav-user">
					<i className="fa-solid fa-user-astronaut"></i>
				</NavIcon>
				<NavIcon as="span" title="Logout" onClick={handleLogout}>
					<i className="fa-solid fa-right-from-bracket"></i>
				</NavIcon>
			</>
		)
	}

	return (
		<NavIcon to={routes.login} title="Login" key="nav-login">
			<i className="fa-solid fa-right-to-bracket"></i>
		</NavIcon>
	)
}

const NavBar = () => {
	return (
		<Nav>
			<NavIcon to={routes.home} title="Home">
				<i className="fa-solid fa-house"></i>
			</NavIcon>
			<NavIcon to={routes.v2}>
				<i className="fa-solid fa-flask-vial"></i>
			</NavIcon>
			<NavIcon to={routes.search} title="Search">
				<i className="fa-solid fa-magnifying-glass"></i>
			</NavIcon>
			<NavIcon to={routes.favorites} title="Favorites">
				<i className="fa-solid fa-heart"></i>
			</NavIcon>
			<NavIcon to={routes.resources} title="Resources">
				<i className="fa-solid fa-link"></i>
			</NavIcon>
			<NavIcon to={routes.faq} title="FAQ">
				<i className="fa-solid fa-messages-question"></i>
			</NavIcon>
			<NavIcon to="data">
				<i className="fa-solid fa-database"></i>
			</NavIcon>
			<AuthNavIcon />
		</Nav>
	)
}

export default memo(NavBar)
