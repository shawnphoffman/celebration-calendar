import { lazy, memo, useCallback, useState } from 'react'
import * as Panelbear from '@panelbear/panelbear-js'

import Agenda from 'components/Agenda'
import { Wrapper } from 'components/styles'
import Event from 'utils/events'

const EventDetails = lazy(() => import('components/EventDetails'))
const Filters = lazy(() => import('components/Filters'))

const Schedule = () => {
	const [selected, setSelected] = useState()

	const handleSelect = useCallback(event => {
		Panelbear.track(Event.EventSelected)
		setSelected(event)
	}, [])

	const handleDismiss = useCallback(() => {
		Panelbear.track(Event.EventDismissed)
		setSelected(null)
	}, [])

	return (
		<>
			<Wrapper>
				<EventDetails event={selected} onDismiss={handleDismiss} />
			</Wrapper>
			<Filters />
			<Agenda onSelect={handleSelect} />
		</>
	)
}

export default memo(Schedule)
