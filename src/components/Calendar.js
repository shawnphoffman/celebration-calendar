import 'kalend/dist/styles/index.css'

import { memo, useMemo } from 'react'
import Kalend, { CalendarView } from 'kalend'

import { useEventContext } from 'context/EventContext'

const Calendar = ({ onSelect }) => {
	const { events, disabledVenues } = useEventContext()

	const filteredEvents = useMemo(() => {
		return events.filter(e => {
			return !disabledVenues.includes(e.venue)
		})
	}, [disabledVenues, events])

	return (
		<div className="Calendar__wrapper">
			<Kalend
				onEventClick={onSelect}
				events={filteredEvents}
				initialDate={'2022-05-26'}
				hourHeight={60}
				initialView={CalendarView.AGENDA}
				disabledViews={[CalendarView.MONTH, CalendarView.WEEK, CalendarView.THREE_DAYS, CalendarView.DAY]}
				timeFormat={'12'}
				weekDayStart={'Monday'}
				focusHour={10}
				language={'en'}
				showTimeLine
				isDark
				autoScroll
			/>
		</div>
	)
}

export default memo(Calendar)
