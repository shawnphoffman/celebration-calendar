import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useDatabase, useDatabaseListData, useUser } from 'reactfire'
import * as Panelbear from '@panelbear/panelbear-js'
import { query, ref, set } from 'firebase/database'

import useLocalStorage from 'hooks/useLocalStorage'
import Event from 'utils/events'

const initialState = {
	favorites: [],
	addFavorite: () => {},
	removeFavorite: () => {},
	isFavorite: () => {},
}

const FavoritesContext = createContext(initialState)

const FavoritesProvider = ({ children }) => {
	const [updated, setUpdated] = useState(false)

	// Non-Auth Storage
	const [favorites, setFavorites] = useLocalStorage('favorites', [])

	// Firebase
	const { data: user } = useUser()
	const database = useDatabase()
	// Firebase User Favorites
	const userFavoritesRef = ref(database, `favorites/${user?.uid}`)
	const userFavoritesQuery = query(userFavoritesRef)
	const { status, data: favoritesListResponse } = useDatabaseListData(userFavoritesQuery, {
		idField: 'id',
	})

	// SYNC FIREBASE WITH LOCALSTORAGE
	useEffect(() => {
		if (!user || status !== 'success' || updated) {
			// console.log('SKIP', { user, status, updated })
			return
		}
		// console.log('GO!', { user, status, updated })
		const storageIds = favorites.map(x => x.id)
		const fireIds = favoritesListResponse.map(x => x.id)
		const shouldUpdate = storageIds.some(x => !fireIds.includes(x))

		if (!shouldUpdate) {
			console.log('IN SYNC. NO UPDATE')
			return
		}

		const finalFireIds = [...new Set([...storageIds, ...fireIds])]
		// console.log('OUT OF SYNC. UPDATING', { storageIds, fireIds, finalFireIds, status, favoritesListResponse })
		console.log('OUT OF SYNC. UPDATING')

		const pending = {}
		finalFireIds.forEach(id => {
			pending[id] = {
				id,
				favorited: true,
			}
		})
		set(userFavoritesRef, pending)
		setUpdated(true)
	}, [favorites, favoritesListResponse, status, updated, user, userFavoritesRef])

	//
	const addFavorite = useCallback(
		event => {
			//
			Panelbear.track(Event.AddFavorite)
			//
			if (user?.uid) {
				const tRef = ref(database, `favorites/${user?.uid}/${event.id}`)
				set(tRef, {
					id: event.id,
					favorited: true,
				})
			}
			//
			setFavorites(
				[...favorites, event].sort((a, b) => {
					const aStart = new Date(a.startDate)
					const bStart = new Date(b.startDate)
					const aEnd = new Date(a.endDate)
					const bEnd = new Date(b.endDate)
					return aStart > bStart ? 1 : aStart === bStart ? (aEnd > bEnd ? 1 : -1) : -1
				})
			)
		},
		[database, user?.uid, setFavorites, favorites]
	)

	//
	const removeFavorite = useCallback(
		event => {
			//
			Panelbear.track(Event.RemoveFavorite)
			//
			if (user?.uid) {
				const tRef = ref(database, `favorites/${user?.uid}/${event.id}`)
				set(tRef, null)
			}
			//
			setFavorites(favorites.filter(f => f !== event))
		},
		[database, user?.uid, setFavorites, favorites]
	)

	//
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
