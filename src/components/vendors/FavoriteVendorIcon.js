import { memo, useCallback, useMemo } from 'react'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

import { useFavoriteVendorsContext } from 'context/FavoriteVendorsContext'
import Event from 'utils/events'

const IconButton = styled.div`
	color: var(--linkActive);
	font-size: 26px;
	cursor: pointer;

	&:hover {
		color: var(--linkHover);
	}
`

const FavoriteVendorIcon = ({ venue }) => {
	const { toggleFavorite, favorites } = useFavoriteVendorsContext()

	const handleAdd = useCallback(
		e => {
			e.stopPropagation()
			toggleFavorite(venue.id, true)
			Panelbear.track(Event.AddFavorite)
		},
		[toggleFavorite, venue]
	)

	const handleRemove = useCallback(
		e => {
			e.stopPropagation()
			toggleFavorite(venue.id, false)
			Panelbear.track(Event.RemoveFavorite)
		},
		[venue, toggleFavorite]
	)

	const isFavorite = useMemo(() => {
		// console.log({ favorites, id: venue.id })
		return favorites.includes(venue.id)
	}, [venue.id, favorites])

	if (isFavorite) {
		return (
			<IconButton key={`${venue.id}.bookmark-solid`} onClick={handleRemove} title="Remove Bookmark">
				<i className="fa-solid fa-bookmark"></i>
			</IconButton>
		)
	}

	return (
		<IconButton key={`${venue.id}-bookmark`} onClick={handleAdd} title="Add Bookmark">
			<i className="fa-light fa-bookmark"></i>
		</IconButton>
	)
}

export default memo(FavoriteVendorIcon)
