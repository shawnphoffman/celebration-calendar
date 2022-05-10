import { memo, useCallback, useMemo } from 'react'
import ICalendarLink from 'react-icalendar-link'
import { styled } from '@linaria/react'

// import * as Panelbear from '@panelbear/panelbear-js'
import colors from 'utils/colors'

export const Button = styled(ICalendarLink)`
	color: ${colors.download};
	font-size: 26px;

	&:hover {
		color: ${colors.iconHover};
	}
`

const DownloadIcon = ({ event }) => {
	const logDownload = useCallback(() => {
		// Panelbear.track(Event.EventDownload)
	}, [])

	const icsEvent = useMemo(() => {
		if (!event) return {}
		return {
			title: event.summary,
			description: event.description,
			startTime: event.startAt,
			endTime: event.endAt,
			location: event.venue,
			url: event.url,
		}
	}, [event])

	if (!event || !ICalendarLink.isSupported) return null

	const icsFilename = `event-${event.id}.ics`

	return (
		<div onClickCapture={logDownload}>
			<Button filename={icsFilename} event={icsEvent}>
				<i className="fa-regular fa-calendar-arrow-down"></i>
			</Button>
		</div>
	)
}

export default memo(DownloadIcon)
