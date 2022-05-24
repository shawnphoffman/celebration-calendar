import React, { memo, useMemo } from 'react'
import { styled } from 'linaria/react'

import { dayColor, dayName, formatTime } from 'utils/dataUtils'

import PrintFavoriteIcon from './PrintFavoriteIcon'

const EventImage = styled.img`
	max-width: 120px;
	max-height: 120px;
`
const ImageWrapper = styled.div`
	background: var(--outline);
	align-items: center;
	display: flex;
`
const EventId = styled.span`
	font-size: 10px;
	font-weight: normal;
	margin-left: 8px;
`
const PrintWrapper = styled.div`
	page-break-inside: avoid;
	break-inside: avoid;
	page-break-after: inherit;
	display: block;

	@media print {
		border-bottom: 1px solid black;
	}
`
const Container = styled.div`
	display: flex;
	flex-direction: row;
	border-bottom: 2px solid var(--bg);
	position: relative;

	@media print {
		border: none;
	}
`
const Event = styled.div`
	padding: 8px;
	flex: 1;
	background: var(--outline);
	color: var(--text);
	page-break-inside: avoid;
	break-inside: avoid;
	position: relative;

	@media print {
		background: none;
		color: black;
	}
`
const DayName = styled.div`
	background-color: ${p => p.bg};
	color: var(--text);
	writing-mode: vertical-lr;
	display: flex;
	justify-content: center;
	transform: rotate(180deg);
	padding: 4px;
	font-size: 12px;
	font-weight: bold;
	flex: 0;
	page-break-inside: avoid;
	break-inside: avoid;

	@media print {
		color: black;
		/* background: #ddd; */
		background: none;
	}
`
const Title = styled.div`
	font-weight: bold;
	font-size: 14px;
	display: flex;
	align-items: center;
`
const ColorBlock = styled.div`
	width: 8px;
	background-color: ${e => e.color ?? `var(--fallback)`};
`
const Description = styled.div`
	font-size: 12px;
	margin-top: 4px;
	white-space: pre-line;
	page-break-inside: avoid;
	break-inside: avoid;
`
const Details = styled.div`
	font-style: italic;
	font-size: 12px;
	margin-top: 4px;
	opacity: 0.8;
	page-break-inside: avoid;
	break-inside: avoid;

	display: flex;
	flex-wrap: wrap;
`
const NoWrap = styled.span`
	margin-right: 8px;
	white-space: nowrap;
`
const ActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: var(--outline);
	padding: 8px;
	page-break-inside: avoid;
	break-inside: avoid;

	@media print {
		/* color: black; */
		background: none;
	}
`

const EventListItem = ({ event }) => {
	const eventDay = useMemo(() => {
		return dayName[new Date(event.startAt).getDay()]
	}, [event.startAt])

	const time = useMemo(
		() => ({
			start: formatTime(event.startAt),
			end: formatTime(event.endAt),
		}),
		[event.endAt, event.startAt]
	)

	return (
		<PrintWrapper>
			<Container>
				<DayName bg={dayColor[eventDay]}>{eventDay}</DayName>
				<ColorBlock color={event.color} />
				<Event>
					<Title>
						{event.summary} <EventId>[ID: {event.id}]</EventId>
					</Title>
					<Details>
						<NoWrap>
							{time.start} - {time.end}
						</NoWrap>
						<NoWrap>({event.venue.trim()})</NoWrap>
					</Details>
					<Description>{event.description}</Description>
				</Event>
				{event.imageUrl && (
					<ImageWrapper>
						<EventImage alt="" src={event.imageUrl} />
					</ImageWrapper>
				)}
				<ActionWrapper>
					<PrintFavoriteIcon event={event} />
				</ActionWrapper>
			</Container>
		</PrintWrapper>
	)
}

export default memo(EventListItem)
