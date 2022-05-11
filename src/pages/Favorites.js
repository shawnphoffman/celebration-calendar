import { memo, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'
import { styled } from 'linaria/react'

import { PageTitle } from 'components/styles'
import EventListItem from 'components/v2/EventListItem'
import Routes from 'config/routes'
import { useFavoritesContext } from 'context/FavoritesContext'

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	overflow-x: hidden;
	background: var(--bg);
	border-radius: 8px;
	flex-direction: column;
	align-items: center;
`
const ScrollBox = styled.div`
	width: 100%;
	overflow-y: scroll;
	::-webkit-scrollbar-corner {
		background: var(--transparent);
	}
`
const LoginPrompt = styled.div`
	margin-bottom: 8px;
`
const Link = styled(NavLink)`
	color: var(--linkAlt);
	font-weight: bold;
	text-decoration: none;

	&:hover {
		color: var(--linkHover);
	}
`

const Favorites = () => {
	const { favorites } = useFavoritesContext()
	const { status, data: signInCheckResult } = useSigninCheck()

	const hasFavorites = useMemo(() => {
		return !!favorites.length
	}, [favorites])

	const showLoginPrompt = useMemo(() => {
		return status === 'success' && !signInCheckResult.signedIn
	}, [status, signInCheckResult])

	return (
		<Container>
			<PageTitle>Favorites</PageTitle>
			{showLoginPrompt && (
				<LoginPrompt>
					If you <Link to={Routes.Login.path}>log in</Link>, we'll save your favorites across your devices!
				</LoginPrompt>
			)}
			<ScrollBox>
				{!hasFavorites && <div>No favorites to display</div>}
				{favorites.map(event => (
					<EventListItem event={event} key={event.id} forceOpen />
				))}
			</ScrollBox>
		</Container>
	)
}

export default memo(Favorites)
