import { memo, useCallback, useMemo } from 'react'
import ICalendarLink from 'react-icalendar-link'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

import { useFavoritesContext } from 'context/FavoritesContext'
import colors from 'utils/colors'

// Styled Components
const ActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const Wrapper = styled.div`
	background: ${colors.containerBg};
	margin: 0px 16px 8px 16px;
	border-radius: 8px;
	padding: 8px 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: ${colors.black};
	max-width: 1200px;
	width: 100%;
`
const Title = styled.div`
	font-weight: bold;
`
const Details = styled.div`
	font-style: italic;
	font-size: 14px;
	margin: 8px 0;

	display: flex;
	flex-wrap: wrap;
`
const Description = styled.div`
	font-size: 12px;
	margin: 8px 0;
`
const IconButton = styled.div`
	font-size: 26px;
	margin-left: 26px;
	color: ${props => props.color ?? 'inherit'};

	&:hover {
		color: ${colors.iconHover};
	}
`
const Button = styled(ICalendarLink)`
	color: ${colors.blue};
	font-size: 26px;
	margin-left: 26px;
`
const Day = styled.span`
	margin-right: 8px;
`
const NoWrap = styled.span`
	margin-right: 8px;
	white-space: nowrap;
`
const EventLink = styled.a`
	color: ${colors.link};
	font-size: 12px;
	font-weight: bold;
`

// Utils
const formatTime = time =>
	new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase().replace(' ', '')
const filename = 'event.ics'
const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// SubComponents
const FavoriteIcon = memo(({ event }) => {
	const { addFavorite, removeFavorite, favorites } = useFavoritesContext()

	const isFavorite = useMemo(() => {
		return favorites.some(f => f.id === event.id)
	}, [event.id, favorites])

	if (isFavorite) {
		return (
			<IconButton key={`${event.id}.heart-solid`} onClick={() => removeFavorite(event)} color={colors.pink} title="Remove Favorite">
				<i className="fa-solid fa-heart"></i>
			</IconButton>
		)
	}

	return (
		<IconButton key={`${event.id}-heart`} onClick={() => addFavorite(event)} title="Add Favorite">
			<i className="fa-regular fa-heart"></i>
		</IconButton>
	)
})

// Component
const EventDetails = ({ event, onDismiss: handleDismiss }) => {
	const logDownload = useCallback(() => {
		Panelbear.track('Event-Downloaded')
	}, [])

	// const handleFavorite = useCallback(() => {
	// 	addFavorite(event)
	// }, [addFavorite, event])

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

	if (!event) return null

	const time = {
		start: formatTime(event.startAt),
		end: formatTime(event.endAt),
	}

	const isSupported = ICalendarLink.isSupported()

	const weekday = dayName[new Date(event.startAt).getDay()]

	return (
		<Wrapper>
			<div>
				<Title>{event.summary}</Title>
				<Details>
					<NoWrap>{event.venue}:</NoWrap>
					{!handleDismiss && <Day>{weekday}</Day>}
					<NoWrap>
						({time.start} - {time.end})
					</NoWrap>
				</Details>
				<Description>{event.description}</Description>
				<EventLink href={event.url} target="_blank" rel="noreferrer">
					View details on the official site <i className="fa-solid fa-up-right-from-square"></i>
				</EventLink>
			</div>
			<ActionWrapper>
				{/* Dismiss */}
				{handleDismiss && (
					<IconButton onClick={handleDismiss}>
						<i className="fa-regular fa-close"></i>
					</IconButton>
				)}
				{/* Favorite */}
				<FavoriteIcon event={event} />
				{/* Download */}
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
