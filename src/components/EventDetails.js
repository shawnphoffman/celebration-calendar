import { memo, useCallback, useMemo } from 'react'
import ICalendarLink from 'react-icalendar-link'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

const ActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Wrapper = styled.div`
	background: #fff;
	margin: 0px 16px 8px 16px;
	border-radius: 8px;
	padding: 8px 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: black;
	max-width: 1200px;
`

const Title = styled.div`
	font-weight: bold;
`

const Details = styled.div`
	font-style: italic;
	font-size: 14px;
	margin: 8px 0;
`

const Description = styled.div`
	font-size: 12px;
	margin: 8px 0;
`

const IconButton = styled.div`
	font-size: 26px;
	margin-left: 26px;
`

const Button = styled(ICalendarLink)`
	font-size: 26px;
	margin-left: 26px;
`

const formatTime = time =>
	new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase().replace(' ', '')

const filename = 'event.ics'

const EventDetails = ({ event, onDismiss: handleDismiss }) => {
	const logDownload = useCallback(() => {
		Panelbear.track('Event-Downloaded')
	}, [])

	const icsEvent = useMemo(() => {
		if (!event) return {}
		return {
			title: event.summary,
			description: event.description,
			startTime: event.startAt,
			endTime: event.endAt,
			location: event.venue,
			url: `https://www.starwarscelebration.com/en-us/panels/panel-information.html?gtID=${event.id}`,
		}
	}, [event])

	if (!event) return null

	const time = {
		start: formatTime(event.startAt),
		end: formatTime(event.endAt),
	}

	const isSupported = ICalendarLink.isSupported()

	return (
		<Wrapper>
			<div>
				<Title>{event.summary}</Title>
				<Details>
					{event.venue} ({time.start} - {time.end})
				</Details>
				<Description>{event.description}</Description>
			</div>
			<ActionWrapper>
				<IconButton onClick={handleDismiss}>
					<i className="fa-regular fa-close"></i>
				</IconButton>
				{isSupported ? (
					<div onClickCapture={logDownload}>
						<Button filename={filename} event={icsEvent}>
							<i className="fa-regular fa-calendar-arrow-down"></i>
						</Button>
					</div>
				) : null}
			</ActionWrapper>
		</Wrapper>
	)
}

export default memo(EventDetails)
