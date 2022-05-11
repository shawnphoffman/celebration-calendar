import { memo, useCallback, useMemo } from 'react'
import ICalendarLink from 'react-icalendar-link'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

import Event from 'utils/events'

export const Button = styled(ICalendarLink)`
	color: var(--download);
	font-size: 26px;

	&:hover {
		color: var(--linkHover);
	}
`

const DownloadIcon = ({ event }) => {
	const logDownload = useCallback(() => {
		Panelbear.track(Event.EventDownload)
	}, [])

	const icsEvent = useMemo(() => {
		if (!event) return {}
		return {
			title: event.summary,
			description: event.description,
			startTime: event.startAt,
			endTime: event.endAt,
			location: event.address || event.venue,
			url: event.url,
		}
	}, [event])

	if (!event || !ICalendarLink.isSupported) return null

	const icsFilename = `event-${event.id}.ics`

	return (
		<div onClickCapture={logDownload} title="Download Event">
			<Button filename={icsFilename} event={icsEvent}>
				<i className="fa-light fa-calendar-arrow-down"></i>
			</Button>
		</div>
	)
}

export default memo(DownloadIcon)
