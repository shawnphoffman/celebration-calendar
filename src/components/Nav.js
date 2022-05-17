import { memo } from 'react'
import { styled } from 'linaria/react'

import { AuthNavIcon } from 'components/auth/AuthNavIcon'
import { NavIcon } from 'components/styles'
import { NavRoutes, preloadRouteComponent } from 'config/routes'

const Nav = styled.div`
	margin: 16px 8px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	display: flex;
`

const NavBar = () => {
	return (
		<Nav>
			{NavRoutes.map(r => (
				<NavIcon to={r.path} title={r.title} key={r.title} onMouseEnter={() => preloadRouteComponent(r.component)}>
					<i className={`fa-solid ${r.icon}`}></i>
				</NavIcon>
			))}
			<AuthNavIcon />
		</Nav>
	)
}

export default memo(NavBar)
