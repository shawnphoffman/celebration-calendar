import { memo, useCallback, useMemo } from 'react'
import ICalendarLink from 'react-icalendar-link'
import * as Panelbear from '@panelbear/panelbear-js'

import { useFavoritesContext } from 'context/FavoritesContext'
import colors from 'utils/colors'
import Event from 'utils/events'
import { dayName, formatTime } from 'utils/eventUtils'

import {
	ActionWrapper,
	Button,
	ContentWrapper,
	Day,
	Description,
	Details,
	EventLink,
	IconButton,
	NoWrap,
	Title,
	Wrapper,
} from './EventDetails.styles'

// SubComponents
const FavoriteIcon = memo(({ event }) => {
	const { addFavorite, removeFavorite, favorites } = useFavoritesContext()

	const handleAdd = useCallback(() => {
		addFavorite(event)
	}, [addFavorite, event])

	const handleRemove = useCallback(() => {
		removeFavorite(event)
	}, [event, removeFavorite])

	const isFavorite = useMemo(() => {
		console.log('isFavorite.2', event.id)
		return favorites.some(f => f.id === event.id)
	}, [event.id, favorites])

	if (isFavorite) {
		return (
			<IconButton key={`${event.id}.heart-solid`} onClick={handleRemove} color={colors.pink} title="Remove Favorite">
				<i className="fa-solid fa-heart"></i>
			</IconButton>
		)
	}

	return (
		<IconButton key={`${event.id}-heart`} onClick={handleAdd} title="Add Favorite" color={colors.pink}>
			<i className="fa-regular fa-heart"></i>
		</IconButton>
	)
})

// Component
const EventDetails = ({ event, onDismiss: handleDismiss }) => {
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
			location: event.venue,
			url: event.url,
		}
	}, [event])

	if (!event) return null

	const icsFilename = `event-${event.id}.ics`

	const time = {
		start: formatTime(event.startAt),
		end: formatTime(event.endAt),
	}

	const isSupported = ICalendarLink.isSupported()

	const weekday = dayName[new Date(event.startAt).getDay()]

	return (
		<Wrapper>
			<ContentWrapper>
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
			</ContentWrapper>
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
						<Button filename={icsFilename} event={icsEvent}>
							<i className="fa-regular fa-calendar-arrow-down"></i>
						</Button>
					</div>
				) : null}
			</ActionWrapper>
		</Wrapper>
	)
}

export default memo(EventDetails)
