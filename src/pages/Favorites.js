import { memo, useMemo } from 'react'
import { styled } from 'linaria/react'

import { PageTitle } from 'components/styles'
import EventListItem from 'components/v2/EventListItem'
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

const Favorites = () => {
	const { favorites } = useFavoritesContext()

	// NOTE This shouldn't be necessary after moving to Firebase
	const sortedFavorites = useMemo(() => {
		return favorites.sort((a, b) => (a.startDate > b.startDate ? 1 : a.startDate === b.startDate ? (a.endDate > b.endDate ? 1 : -1) : -1))
	}, [favorites])

	const hasFavorites = useMemo(() => {
		return !!favorites.length
	}, [favorites])

	return (
		<Container>
			<PageTitle>Favorites</PageTitle>
			<ScrollBox>
				{!hasFavorites && <div>No favorites to display</div>}
				{sortedFavorites.map(event => (
					<EventListItem event={event} key={event.id} forceOpen />
				))}
			</ScrollBox>
		</Container>
	)
}

export default memo(Favorites)
