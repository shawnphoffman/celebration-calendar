import { memo, useCallback, useState } from 'react'

import Calendar from 'components/Calendar'
import EventDetails from 'components/EventDetails'
import Filters from 'components/Filters'

const Schedule = () => {
	const [selected, setSelected] = useState()

	const handleSelect = useCallback(event => {
		setSelected(event)
	}, [])

	const handleDismiss = useCallback(() => {
		setSelected(null)
	}, [])

	return (
		<>
			<EventDetails event={selected} onDismiss={handleDismiss} />
			<Filters />
			<Calendar onSelect={handleSelect} />
		</>
	)
}

export default memo(Schedule)
