import React, { createContext, memo, useCallback, useContext, useMemo } from 'react'
import * as Panelbear from '@panelbear/panelbear-js'
import useLocalStorage from 'hooks/useLocalStorage'

const initialState = {
	favorites: [],
	addFavorite: () => {},
	removeFavorite: () => {},
	isFavorite: () => {},
}

const FavoritesContext = createContext(initialState)

const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useLocalStorage('favorites', [])

	const addFavorite = useCallback(
		event => {
			Panelbear.track('Favorite-Add')
			setFavorites(
				[...favorites, event].sort((a, b) =>
					a.startDate > b.startDate ? 1 : a.startDate === b.startDate ? (a.endDate > b.endDate ? 1 : -1) : -1
				)
			)
		},
		[favorites, setFavorites]
	)

	const removeFavorite = useCallback(
		event => {
			Panelbear.track('Favorite-Remove')
			setFavorites(favorites.filter(f => f !== event))
		},
		[favorites, setFavorites]
	)

	const isFavorite = useCallback(
		id => {
			return favorites.some(f => f.id === id)
		},
		[favorites]
	)

	const value = useMemo(() => {
		return {
			favorites,
			addFavorite,
			removeFavorite,
			isFavorite,
		}
	}, [addFavorite, favorites, isFavorite, removeFavorite])

	return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavoritesContext = () => useContext(FavoritesContext)

export default memo(FavoritesProvider)
