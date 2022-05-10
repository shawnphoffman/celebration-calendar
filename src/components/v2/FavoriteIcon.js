import { memo, useCallback, useMemo } from 'react'
import { styled } from '@linaria/react'

import { useFavoritesContext } from 'context/FavoritesContext'
import colors from 'utils/colors'

const IconButton = styled.div`
	font-size: 26px;
	color: ${props => props.color ?? 'inherit'};
	cursor: pointer;

	&:hover {
		color: ${colors.iconHover};
	}
`

const FavoriteIcon = ({ event }) => {
	const { addFavorite, removeFavorite, favorites } = useFavoritesContext()

	const handleAdd = useCallback(
		e => {
			e.stopPropagation()
			addFavorite(event)
		},
		[addFavorite, event]
	)

	const handleRemove = useCallback(
		e => {
			e.stopPropagation()
			removeFavorite(event)
		},
		[event, removeFavorite]
	)

	const isFavorite = useMemo(() => {
		return favorites.some(f => f.id === event.id)
	}, [event.id, favorites])

	if (isFavorite) {
		return (
			<IconButton key={`${event.id}.heart-solid`} onClick={handleRemove} color={colors.pink} title="Remove Favorite">
				<i className="fa-solid fa-heart"></i>
			</IconButton>
		)
	}

	return (
		<IconButton key={`${event.id}-heart`} onClick={handleAdd} title="Add Favorite" color={colors.pink}>
			<i className="fa-regular fa-heart"></i>
		</IconButton>
	)
}

export default memo(FavoriteIcon)
