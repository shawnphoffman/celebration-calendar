import { memo, useCallback, useMemo } from 'react'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

import { useFavoritesContext } from 'context/FavoritesContext'
import Event from 'utils/events'

const IconButton = styled.div`
	color: var(--heart);
	font-size: 26px;
	cursor: pointer;

	&:hover {
		color: var(--linkHover);
	}
`

const FavoriteIcon = ({ event }) => {
	const { toggleFavorite, favorites } = useFavoritesContext()

	const handleAdd = useCallback(
		e => {
			e.stopPropagation()
			toggleFavorite(event.id, true)
			Panelbear.track(Event.AddFavorite)
		},
		[toggleFavorite, event]
	)

	const handleRemove = useCallback(
		e => {
			e.stopPropagation()
			toggleFavorite(event.id, false)
			Panelbear.track(Event.RemoveFavorite)
		},
		[event, toggleFavorite]
	)

	const isFavorite = useMemo(() => {
		// console.log({ favorites, id: event.id })
		return favorites.includes(event.id)
	}, [event.id, favorites])

	if (isFavorite) {
		return (
			<IconButton key={`${event.id}.heart-solid`} onClick={handleRemove} title="Remove Favorite">
				<i className="fa-solid fa-heart"></i>
			</IconButton>
		)
	}

	return (
		<IconButton key={`${event.id}-heart`} onClick={handleAdd} title="Add Favorite">
			<i className="fa-light fa-heart"></i>
		</IconButton>
	)
}

export default memo(FavoriteIcon)
