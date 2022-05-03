import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import rawEvents from 'data/schedule.json'

import { processEvents } from 'utils/eventUtils'

const initialState = {
	events: [],
	selected: null,
	setSelected: () => {},
}

export const EventContext = createContext(initialState)

const EventProvider = ({ children }) => {
	const [events, setEvents] = useState()
	// const [selected, setSelected] = useState()

	const values = useMemo(() => {
		return {
			events,
			// selected,
			// setSelected,
		}
		// }, [events, selected])
	}, [events])

	useEffect(() => {
		console.log('processing events')
		setEvents(processEvents(rawEvents))
	}, [])

	return <EventContext.Provider value={values}>{children}</EventContext.Provider>
}

export const useEventContext = () => useContext(EventContext)

export default EventProvider
