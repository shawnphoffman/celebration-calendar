import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useDatabase, useDatabaseListData, useUser } from 'reactfire'
import * as Panelbear from '@panelbear/panelbear-js'
import { /*increment, */ query, ref, set } from 'firebase/database'

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
	// Storage
	const [favorites, setFavorites] = useLocalStorage('favorites', [])
	// Firebase
	const { data: user } = useUser()
	const database = useDatabase()
	const userFavoritesRef = ref(database, `favorites/${user?.uid}`)
	// const allCountsRef = ref(database, 'counts')
	// const getEventCountsRef = useCallback(
	// 	id => {
	// 		return ref(database, `counts/${id}`)
	// 	},
	// 	[database]
	// )
	// const allCountsResponse = useDatabaseObjectData(allCountsRef)
	const userFavoritesQuery = query(userFavoritesRef)
	const { status, data: favoritesListResponse } = useDatabaseListData(userFavoritesQuery, {
		idField: 'id',
	})

	//
	//
	//
	// useEffect(() => {
	// 	if (status !== 'success' || updated) {
	// 		return
	// 	}
	// 	const storageIds = favorites.map(x => x.id).sort()
	// 	const fireIds = favoritesListResponse.map(x => x.id).sort()
	// 	const shouldUpdate = storageIds.some(x => !fireIds.includes(x))

	// 	if (!shouldUpdate) {
	// 		console.log('SHOULD NOT UPDATE')
	// 		return
	// 	}

	// 	const finalFireIds = [...new Set([...storageIds, ...fireIds].sort())]
	// 	console.log('wow', { storageIds, fireIds, finalFireIds, status, favoritesListResponse })

	// 	const pending = {}
	// 	finalFireIds.forEach(id => {
	// 		pending[id] = {
	// 			id,
	// 			favorited: true,
	// 		}
	// 	})
	// 	set(userFavoritesRef, pending)
	// 	setUpdated(true)
	// }, [favorites, favoritesListResponse, status, updated, userFavoritesRef])

	// useEffect(() => {
	// 	if (allCountsResponse.status === 'success') {
	// 		// console.log('useEffect.allCounts', allCountsResponse.data)
	// 	}

	// 	// if (userFavoritesResponse.status === 'success') {
	// 	// 	console.log('useEffect.userFavorites', userFavoritesResponse.data)
	// 	// }
	// 	// }, [allCountsResponse, userFavoritesResponse])
	// }, [allCountsResponse])

	const addFavorite = useCallback(
		event => {
			Panelbear.track(Event.AddFavorite)
			const tRef = ref(database, `favorites/${user?.uid}/${event.id}`)
			set(tRef, {
				id: event.id,
				favorited: true,
			})
			// set(getEventCountsRef(event.id), increment(1))
			setFavorites(
				[...favorites, event].sort((a, b) =>
					a.startDate > b.startDate ? 1 : a.startDate === b.startDate ? (a.endDate > b.endDate ? 1 : -1) : -1
				)
			)
		},
		[database, user?.uid, setFavorites, favorites]
	)

	const removeFavorite = useCallback(
		event => {
			Panelbear.track(Event.RemoveFavorite)
			const tRef = ref(database, `favorites/${user?.uid}/${event.id}`)
			set(tRef, null)
			// set(getEventCountsRef(event.id), increment(-1))
			setFavorites(favorites.filter(f => f !== event))
		},
		[database, user?.uid, setFavorites, favorites]
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
