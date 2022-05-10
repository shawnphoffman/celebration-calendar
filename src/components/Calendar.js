import 'kalend/dist/styles/index.css'

import { memo } from 'react'
import Kalend, { CalendarView } from 'kalend'
import { styled } from 'linaria/react'

import { useEventContext } from 'context/EventContext'

import Loading from './Loading'

const Wrapper = styled.div`
	background: none;
	overflow: hidden;
	margin-bottom: 8px;
	padding-left: 16px;
	padding-right: 16px;
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
	const [state] = useEventContext()

	if (!state) return <Loading />

	console.log('Calendar.render', {
		state,
	})

	return (
		<Wrapper>
			<Kalend
				onEventClick={onSelect}
				events={state.filteredEvents}
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
