import { memo, useMemo } from 'react'
import { styled } from 'linaria/react'

import EventDetails from 'components/EventDetails'
import { Header } from 'components/styles'
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
	/* color: black; */
	width: 100%;
	overflow-y: scroll;
	::-webkit-scrollbar-corner {
		background: rgba(0, 0, 0, 0);
	}
`

const Favorites = () => {
	const { favorites } = useFavoritesContext()

	const hasFavorites = useMemo(() => {
		return !!favorites.length
	}, [favorites])

	return (
		<Container>
			<Header>Favorites</Header>
			<ScrollBox>
				{!hasFavorites && <div>No favorites to display</div>}
				{favorites.map(event => (
					<EventDetails event={event} key={event.id} />
				))}
			</ScrollBox>
		</Container>
	)
}

export default memo(Favorites)
