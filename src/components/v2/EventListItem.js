import React, { memo, useCallback, useMemo, useState } from 'react'
import { styled } from 'linaria/react'

import colors from 'utils/colors'
import { dayColor, dayName, formatTime } from 'utils/eventUtils'

import DownloadIcon from './DownloadIcon'
import FavoriteIcon from './FavoriteIcon'

const Container = styled.div`
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid black;
	cursor: pointer;
`
const Event = styled.div`
	padding: 16px;
	flex: 1;
	background: white;
`
const DayName = styled.div`
	background-color: ${p => p.bg};
	color: white;
	writing-mode: vertical-lr;
	display: flex;
	justify-content: center;
	transform: rotate(180deg);
	padding: 8px;
	font-size: 12px;
	font-weight: bold;
	flex: 0;
`

const Title = styled.div`
	font-weight: bold;
	font-size: 16px;
`
const ColorBlock = styled.div`
	/* width: 20px; */
	width: 12px;
	background-color: ${e => e.color};
`
const Description = styled.div`
	font-size: 12px;
	margin: 8px 0;
`
const Details = styled.div`
	font-style: italic;
	font-size: 14px;
	margin-top: 8px;

	display: flex;
	flex-wrap: wrap;
`
const EventLink = styled.a`
	color: ${colors.link};
	font-size: 12px;
	font-weight: bold;

	&:hover {
		color: ${colors.iconHover};
	}
`
const NoWrap = styled.span`
	margin-right: 8px;
	white-space: nowrap;
`
const ActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: white;
	padding: 8px;
	/* Accommodate scroll bars */
	padding-right: 12px;
`

const EventListItem = ({ event }) => {
	const [expanded, setExpanded] = useState(false)

	const eventDay = useMemo(() => {
		return dayName[new Date(event.startAt).getDay()]
	}, [event.startAt])

	const handleClick = useCallback(() => {
		setExpanded(!expanded)
	}, [expanded])

	const time = useMemo(
		() => ({
			start: formatTime(event.startAt),
			end: formatTime(event.endAt),
		}),
		[event.endAt, event.startAt]
	)
	return (
		<Container onClick={handleClick}>
			<DayName bg={dayColor[eventDay]}>{eventDay}</DayName>
			<ColorBlock color={event.color} />
			<Event onClick={() => {}}>
				<Title>{event.summary}</Title>
				<Details>
					<NoWrap>
						{time.start} - {time.end}
					</NoWrap>
					<NoWrap>({event.venue})</NoWrap>
				</Details>
				{expanded && (
					<>
						<Description>{event.description}</Description>
						<EventLink href={event.url} target="_blank" rel="noreferrer">
							View details on the official site <i className="fa-solid fa-up-right-from-square"></i>
						</EventLink>
					</>
				)}
			</Event>

			<ActionWrapper>
				{/* Favorite */}
				<FavoriteIcon event={event} />
				{/* Download */}
				<DownloadIcon event={event} />
			</ActionWrapper>
		</Container>
	)
}

export default memo(EventListItem)
