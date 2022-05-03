import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import rawEvents from 'data/schedule.json'

import { getVenues, processEvents } from 'utils/eventUtils'

const processedVenues = () => {
	// () => Array.from(getVenues(rawEvents)).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })),
	const v = Array.from(getVenues(rawEvents))
	const t = v.reduce((memo, curr) => {
		memo[curr] = true
		return memo
	}, {})
	return t
}

const processedEvents = processEvents(rawEvents)

const initialState = {
	events: [],
	venues: {},
	toggleFilter: () => {},
}

export const EventContext = createContext(initialState)

const EventProvider = ({ children }) => {
	const [events, setEvents] = useState(processedEvents)
	const [venues, setVenues] = useState(processedVenues())

	useEffect(() => {}, [events, venues])

	const toggleFilter = useCallback(
		venue => {
			const newVenues = {
				...venues,
				[venue]: !venues[venue],
			}

			setVenues(newVenues)

			const enabledVenues = Object.keys(newVenues).reduce((memo, curr) => {
				if (newVenues[curr]) {
					memo.push(curr)
				}
				return memo
			}, [])

			const filteredEvents = processedEvents.filter(e => {
				return enabledVenues.includes(e.venue)
			})

			setEvents(filteredEvents)
		},
		[venues]
	)

	// const values = useMemo(() => {
	// 	return {
	// 		events,
	// 		venues,
	// 		toggleFilter,
	// 		// filters,
	// 		// setFilters,
	// 		// selected,
	// 		// setSelected,
	// 	}
	// }, [events, toggleFilter, venues])

	return <EventContext.Provider value={{ events, venues, toggleFilter }}>{children}</EventContext.Provider>
	// return <EventContext.Provider value={values}>{children}</EventContext.Provider>
}

export const useEventContext = () => useContext(EventContext)

export default EventProvider
