import 'kalend/dist/styles/index.css'

import { memo } from 'react'
import Kalend, { CalendarView } from 'kalend'

import { useEventContext } from 'context/EventContext'

const Calendar = ({ onSelect }) => {
	const { events } = useEventContext()

	return (
		<div className="Calendar__wrapper">
			<Kalend
				// kalendRef={kalendRef}
				onEventClick={onSelect}
				events={events}
				initialDate={'2022-05-26'}
				hourHeight={60}
				initialView={CalendarView.AGENDA}
				// disabledViews={[CalendarView.MONTH, CalendarView.WEEK, CalendarView.THREE_DAYS]}
				disabledViews={[CalendarView.MONTH, CalendarView.WEEK, CalendarView.THREE_DAYS, CalendarView.DAY]}
				// onSelectView={onSelectView}
				// selectedView={selectedView}
				// onPageChange={onPageChange}
				// calendarIDsHidden={['work']}
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

/*

initialDate?: string;
initialView?: CALENDAR_VIEW;
selectedView?: CALENDAR_VIEW;
disabledViews?: CALENDAR_VIEW[];
events?: any;
isDark?: boolean;
hourHeight?: number;
onNewEventClick?: OnNewEventClickFunc;
onEventClick?: OnEventClickFunc;
onSelectView?: OnSelectViewFunc;
showMoreMonth?: ShowMoreMonthFunc;
onPageChange?: OnPageChangeFunc;
onEventDragFinish?: OnEventDragFinishFunc;
draggingDisabledConditions?: {
		[key: string]: boolean | string | number;
};
isNewEventOpen?: boolean;
onStateChange?: any;
disableMobileDropdown?: boolean;
timezone?: string;
weekDayStart?: string;
timeFormat?: string;
calendarIDsHidden?: string[];
children?: any;
language?: string;
customLanguage?: any;
eventLayouts?: any;
kalendRef?: any;
style?: Style;
focusHour?: number;
showTimeLine?: boolean;
showWeekNumbers?: boolean;
colors?: Colors;
autoScroll?: boolean;

*/

export default memo(Calendar)
