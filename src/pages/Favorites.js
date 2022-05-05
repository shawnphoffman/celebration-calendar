import { memo, useMemo } from 'react'

import EventDetails from 'components/EventDetails'
import { Header, Wrapper } from 'components/styles'
import { useFavoritesContext } from 'context/FavoritesContext'

const Favorites = () => {
	const { favorites } = useFavoritesContext()

	const hasFavorites = useMemo(() => {
		return !!favorites.length
	}, [favorites])

	return (
		<Wrapper>
			<Header>Favorites</Header>
			{!hasFavorites && <div>No favorites to display</div>}
			{favorites.map(event => (
				<EventDetails event={event} key={event.id} />
			))}
		</Wrapper>
	)
}

export default memo(Favorites)
