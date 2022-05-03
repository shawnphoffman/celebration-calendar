import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as Panelbear from '@panelbear/panelbear-js'

import { processApiData } from 'utils/eventUtils'

const initialState = {
	events: [],
	venues: [],
	disabledVenues: [],
	toggleFilter: () => {},
}

const EventContext = createContext(initialState)

const EventProvider = ({ children }) => {
	const [events, setEvents] = useState([])
	const [venues, setVenues] = useState([])
	const [disabledVenues, setDisabledVenues] = useState([])

	useEffect(() => {
		// https://api-melupufoagt.stackpathdns.com/api/schedules?key=f4da60d9-7791-4d31-aaf0-5cce46bf1e5d
		fetch(process.env.REACT_APP_SCHEDULE_ENDPOINT)
			.then(res => res.json())
			.then(data => {
				const { events, venues } = processApiData(data)
				setEvents(events)
				setVenues(venues)
			})
			.catch(e => {
				Panelbear.track('Fetch-Failure')
				import('../data/schedule.json').then(rawEvents => {
					const { events, venues } = processApiData(rawEvents)
					setEvents(events)
					setVenues(venues)
				})
			})
	}, [])

	// TODO Replace this with a reducer to minimize renders
	const toggleFilter = useCallback(
		venue => {
			if (disabledVenues.includes(venue)) {
				setDisabledVenues(disabledVenues.filter(v => v !== venue))
			} else {
				setDisabledVenues([...disabledVenues, venue])
			}
		},
		[disabledVenues]
	)

	const value = useMemo(() => {
		return {
			events,
			venues,
			toggleFilter,
			disabledVenues,
		}
	}, [disabledVenues, events, toggleFilter, venues])

	return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}

export const useEventContext = () => useContext(EventContext)

export default memo(EventProvider)
