import React, { createContext, memo, useCallback, useContext, useEffect, useMemo } from 'react'
import { useDatabase, useDatabaseObjectData, useSigninCheck, useUser } from 'reactfire'
import { equalTo, orderByValue, query, ref, set } from 'firebase/database'

import useLocalStorage from 'hooks/useLocalStorage'

const favoritesStorageKey = 'SWC.FavoriteVendors'

const initialState = {
	favorites: [],
	toggleFavorite: () => {},
}

const FavoriteVendorsContext = createContext(initialState)

const FavoriteVendorsProvider = ({ children }) => {
	// Non-Auth Storage
	const [favorites, setFavorites] = useLocalStorage(favoritesStorageKey, [])

	// ============================================================

	// Firebase
	const { status: signinStatus, data: signInCheckResult } = useSigninCheck()
	const { data: user } = useUser()
	const database = useDatabase()

	// ============================================================

	// User Favorites Query
	const userFavQ = useMemo(() => {
		const userFavRef = ref(database, `user-favorite-vendors/${user?.uid}`)
		const userFavQuery = query(userFavRef, orderByValue())
		return query(userFavQuery, equalTo('true'))
	}, [database, user])

	// User Favorites Resp
	const userFavResp = useDatabaseObjectData(userFavQ, {})

	// User Favorite
	const userFaves = useMemo(() => {
		if (userFavResp?.status !== 'success' || !userFavResp?.data) return []
		return Object.keys(userFavResp?.data) || []
	}, [userFavResp?.data, userFavResp?.status])

	// ============================================================

	// Add/Remove User Favorite
	const toggleFavorite = useCallback(
		(id, newState) => {
			if (signinStatus === 'success' && signInCheckResult?.signedIn) {
				const userFavRef = ref(database, `user-favorite-vendors/${user?.uid}/${id}`)
				set(userFavRef, newState ? 'true' : null)
				console.log('UPDATING FIREBASE WITH FAVORITE')
			} else {
				const existing = JSON.parse(localStorage.getItem(favoritesStorageKey) || '[]')
				if (newState) {
					console.log('ADDING NEW FAVORITE TO STORAGE')
					setFavorites([...existing, id])
				} else {
					console.log('REMOVING FAVORITE FROM STORAGE')
					setFavorites(existing.filter(x => x !== id))
				}
			}
		},
		[database, setFavorites, signInCheckResult?.signedIn, signinStatus, user?.uid]
	)

	// ============================================================

	// Authenticated Persistence
	useEffect(() => {
		if (signinStatus === 'success' && signInCheckResult?.signedIn && userFavResp.status === 'success') {
			// console.log('USER FAVES CHANGED', userFaves)
			console.log('FIREBASE CHANGED. UPDATING STORAGE')
			setFavorites(userFaves)
		}
	}, [setFavorites, signInCheckResult?.signedIn, signinStatus, userFavResp.status, userFaves])

	// ============================================================

	// console.log({ userFaves, user })

	const value = useMemo(() => {
		return {
			favorites,
			toggleFavorite,
		}
	}, [favorites, toggleFavorite])

	return <FavoriteVendorsContext.Provider value={value}>{children}</FavoriteVendorsContext.Provider>
}

export const useFavoriteVendorsContext = () => useContext(FavoriteVendorsContext)

export default memo(FavoriteVendorsProvider)
