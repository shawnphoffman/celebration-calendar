import React, { createContext, memo, useContext, useEffect, useReducer } from 'react'
import * as Panelbear from '@panelbear/panelbear-js'

import Event from 'utils/events'
import { processApiData } from 'utils/eventUtils'

const disabledVenueStorageKey = 'SWC.DisabledVenues'

const EventContext = createContext()

export const EventAction = {
	TOGGLE_VENUE: 'TOGGLE_VENUE',
	SET_EVENTS: 'SET_EVENTS',
}

const initialReducerState = {
	allEvents: [],
	allVenues: [],
	disabledVenues: JSON.parse(localStorage.getItem(disabledVenueStorageKey)),
}

const reducer = (state, action) => {
	switch (action.type) {
		case EventAction.SET_EVENTS:
			// Don't set it multiple times
			if (state.allEvents.length > 0) {
				return state
			}
			return {
				...state,
				allEvents: action.name,
				allVenues: action.venues,
				disabledVenues: action.disabled,
			}
		case EventAction.TOGGLE_VENUE:
			const isAdding = state.disabledVenues.includes(action.name)
			if (isAdding) {
				const newVenues = state.disabledVenues.filter(v => v !== action.name)
				return {
					...state,
					disabledVenues: newVenues,
				}
			} else {
				const newVenues = [...state.disabledVenues, action.name]
				return {
					...state,
					disabledVenues: newVenues,
				}
			}
		default:
			return state
	}
}

const EventProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialReducerState)

	useEffect(() => {
		// console.log('EventContext.init')

		let disabledVenues = []
		const raw = localStorage.getItem(disabledVenueStorageKey)
		if (raw) {
			const stored = JSON.parse(raw)
			// console.log('STORED', stored)
			if (Array.isArray(stored)) {
				disabledVenues = stored
			}
		}

		// https://api-melupufoagt.stackpathdns.com/api/schedules?key=f4da60d9-7791-4d31-aaf0-5cce46bf1e5d
		fetch(process.env.REACT_APP_SCHEDULE_ENDPOINT)
			.then(res => res.json())
			.then(data => {
				const { events, venues } = processApiData(data)
				dispatch({ type: EventAction.SET_EVENTS, name: events, venues: venues, disabled: disabledVenues })
			})
			.catch(e => {
				Panelbear.track(Event.FetchFailure)
				import('../data/schedule.json').then(rawEvents => {
					const { events, venues } = processApiData(rawEvents)
					dispatch({ type: EventAction.SET_EVENTS, name: events, venues: venues, disabled: disabledVenues })
				})
			})
	}, [])

	useEffect(() => {
		localStorage.setItem(disabledVenueStorageKey, JSON.stringify(state.disabledVenues))
	}, [state.disabledVenues])

	return <EventContext.Provider value={[state, dispatch]}>{children}</EventContext.Provider>
}

export const useEventContext = () => useContext(EventContext)

export default memo(EventProvider)
