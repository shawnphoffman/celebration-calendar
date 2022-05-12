import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useDatabase, useDatabaseListData, useUser } from 'reactfire'
import * as Panelbear from '@panelbear/panelbear-js'
import { query, ref, set } from 'firebase/database'

import useLocalStorage from 'hooks/useLocalStorage'
import Event from 'utils/events'

const favoritesStorageKey = 'SWC.Favorites'

const initialState = {
	favorites: [],
	addFavorite: () => {},
	removeFavorite: () => {},
}

const FavoritesContext = createContext(initialState)

const FavoritesProvider = ({ children }) => {
	const [updated, setUpdated] = useState(false)

	// Non-Auth Storage
	const [favorites, setFavorites] = useLocalStorage(favoritesStorageKey, [])

	// Firebase
	const { data: user } = useUser()
	const database = useDatabase()
	// Firebase User Favorites
	const userFavoritesRef = ref(database, `favorites/${user?.uid}`)
	const userFavoritesQuery = query(userFavoritesRef)
	const {
		status,
		data: favoritesListResponse,
		// ...rest
	} = useDatabaseListData(userFavoritesQuery, {
		idField: 'id',
	})

	// SYNC FIREBASE WITH LOCALSTORAGE
	useEffect(() => {
		if (!user || status !== 'success' || updated) {
			// console.log('Effect.SKIP', { status, updated })
			return
		}
		// console.log('Effect.GO')
		const initStorageIds = favorites
		const initFireIds = favoritesListResponse.map(x => x.id)
		const shouldUpdate =
			initStorageIds.length !== initFireIds.length ||
			initStorageIds.some(x => !initFireIds.includes(x)) ||
			initFireIds.some(x => !initStorageIds.includes(x))

		if (!shouldUpdate) {
			// console.log('IN SYNC. NO UPDATE')
			return
		}

		const finalFavoriteIds = [...new Set([...initStorageIds, ...initFireIds])]
		// console.log('OUT OF SYNC. UPDATING', { initStorageIds, initFireIds, finalFavoriteIds })

		const pending = {}
		finalFavoriteIds.forEach(id => {
			pending[id] = {
				id,
				favorited: true,
			}
		})
		set(userFavoritesRef, pending)
		setFavorites(finalFavoriteIds)
		setUpdated(true)
	}, [favorites, favoritesListResponse, setFavorites, status, updated, user, userFavoritesRef])

	// POST-LOAD UPDATES
	useEffect(() => {
		if (updated && status === 'success') {
			const fireIds = favoritesListResponse.map(x => x.id)
			// console.log('MORE', { status, favoritesListResponse, rest })
			if (fireIds.length !== favorites.length) {
				setFavorites(fireIds)
			}
		}
		// TODO Figure this shit out
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favoritesListResponse, setFavorites])

	//
	const addFavorite = useCallback(
		id => {
			//
			Panelbear.track(Event.AddFavorite)
			//
			if (user?.uid) {
				const tRef = ref(database, `favorites/${user?.uid}/${id}`)
				set(tRef, {
					id: id,
					favorited: true,
				})
			}

			setFavorites([...favorites, id])
		},
		[database, user?.uid, setFavorites, favorites]
	)

	//
	const removeFavorite = useCallback(
		id => {
			//
			Panelbear.track(Event.RemoveFavorite)
			//
			if (user?.uid) {
				const tRef = ref(database, `favorites/${user?.uid}/${id}`)
				set(tRef, null)
			}
			//
			setFavorites(favorites.filter(f => f !== id))
		},
		[database, user?.uid, setFavorites, favorites]
	)

	const value = useMemo(() => {
		return {
			favorites,
			addFavorite,
			removeFavorite,
		}
	}, [addFavorite, favorites, removeFavorite])

	return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavoritesContext = () => useContext(FavoritesContext)

export default memo(FavoritesProvider)
