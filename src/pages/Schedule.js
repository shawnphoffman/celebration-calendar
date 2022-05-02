import { memo, useCallback, useMemo, useState } from 'react'

import rawEvents from 'data/schedule.json'

import Calendar from 'components/Calendar'
import EventDetails from 'components/EventDetails'
import Filters from 'components/Filters'
import { processEvents } from 'utils/eventUtils'

const Schedule = () => {
	const [selected, setSelected] = useState()
	const events = useMemo(() => {
		return processEvents(rawEvents)
	}, [])

	const handleSelect = useCallback(event => {
		setSelected(event)
	}, [])

	return (
		<>
			<EventDetails event={selected} />
			<Filters />
			<Calendar events={events} onSelect={handleSelect} />
		</>
	)
}

export default memo(Schedule)
