import React, { createContext, memo, useContext, useEffect, useReducer } from 'react'

// import * as Panelbear from '@panelbear/panelbear-js'
// import Vendor from 'utils/events'
import { processApiVendors } from 'utils/dataUtils'

// const disabledVenueStorageKey = 'SWC.DisabledVenues.2'

const VendorContext = createContext()

export const VendorAction = {
	// TOGGLE_VENUE: 'TOGGLE_VENUE',
	// ALL_VENUES_ON: 'ALL_VENUES_ON',
	// ALL_VENUES_OFF: 'ALL_VENUES_OFF',
	SET_VENDORS: 'SET_VENDORS',
}

const initialReducerState = {
	allVendors: [],
	allTattoos: [],
	// allVenues: [],
	// disabledVenues: JSON.parse(localStorage.getItem(disabledVenueStorageKey)),
}

const reducer = (state, action) => {
	switch (action.type) {
		case VendorAction.SET_VENDORS:
			// Don't set it multiple times
			if (state.allVendors.length > 0) {
				return state
			}
			return {
				...state,
				allVendors: action.vendors,
				allTattoos: action.tattooArtists,
			}
		default:
			return state
	}
}

const VendorProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialReducerState)

	useEffect(() => {
		fetch(process.env.REACT_APP_VENDOR_ENDPOINT)
			.then(res => res.json())
			.then(data => {
				const { vendors, tattooArtists } = processApiVendors(data)
				dispatch({ type: VendorAction.SET_VENDORS, vendors, tattooArtists })
			})
			.catch(e => {
				// Panelbear.track(Vendor.FetchFailure)
				import('../data/vendors.json').then(rawVendors => {
					const { vendors, tattooArtists } = processApiVendors(rawVendors)
					dispatch({ type: VendorAction.SET_VENDORS, vendors, tattooArtists })
				})
			})
	}, [])

	// useEffect(() => {
	// 	localStorage.setItem(disabledVenueStorageKey, JSON.stringify(state.disabledVenues))
	// }, [state.disabledVenues])

	return <VendorContext.Provider value={[state, dispatch]}>{children}</VendorContext.Provider>
}

export const useVendorContext = () => useContext(VendorContext)

export default memo(VendorProvider)
