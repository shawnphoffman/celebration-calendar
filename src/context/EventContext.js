import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// https://api-melupufoagt.stackpathdns.com/api/schedules?key=f4da60d9-7791-4d31-aaf0-5cce46bf1e5d
import { processEvents, processVenues } from 'utils/eventUtils'

const initialState = {
	events: [],
	venues: {},
	toggleFilter: () => {},
}

const EventContext = createContext(initialState)

const EventProvider = ({ children }) => {
	const [allEvents, setAllEvents] = useState()
	const [filteredEvents, setFilteredEvents] = useState()
	const [venues, setVenues] = useState({})

	useEffect(() => {
		fetch(process.env.REACT_APP_SCHEDULE_ENDPOINT)
			.then(res => res.json())
			.then(data => {
				const events = processEvents(data)
				setFilteredEvents(events)
				setAllEvents(events)
				setVenues(processVenues(data))
			})
			.catch(e => console.error(e))
	}, [])

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

			const filteredEvents = allEvents.filter(e => {
				return enabledVenues.includes(e.venue)
			})

			setFilteredEvents(filteredEvents)
		},
		[allEvents, venues]
	)

	const value = useMemo(() => {
		return {
			events: filteredEvents,
			venues,
			toggleFilter,
		}
	}, [filteredEvents, toggleFilter, venues])

	return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}

export const useEventContext = () => useContext(EventContext)

export default memo(EventProvider)
