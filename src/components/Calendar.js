import 'kalend/dist/styles/index.css'

import { memo, useMemo } from 'react'
import Kalend, { CalendarView } from 'kalend'
import { styled } from 'linaria/react'

import { useEventContext } from 'context/EventContext'

const Wrapper = styled.div`
	background: none;
	overflow: hidden;
	margin-bottom: 8px;
	padding-left: 8px;
	padding-right: 8px;
	width: 100%;
	height: 100%;
	display: flex;
	max-width: 1200px;
	border-radius: 12px;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

const Calendar = ({ onSelect }) => {
	const { events, disabledVenues } = useEventContext()

	const filteredEvents = useMemo(() => {
		return events.filter(e => {
			return !disabledVenues.includes(e.venue)
		})
	}, [disabledVenues, events])

	return (
		<Wrapper>
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
		</Wrapper>
	)
}

export default memo(Calendar)
