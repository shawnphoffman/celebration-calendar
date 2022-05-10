import React, { memo, useMemo } from 'react'
import { styled } from 'linaria/react'

import Loading from 'components/Loading'
import { useEventContext } from 'context/EventContext'

import EventListItem from './EventListItem'

const Container = styled.div`
	flex: 1;
	width: 100%;
	display: flex;
	justify-content: center;
	overflow-x: hidden;
`
const ScrollBox = styled.div`
	color: black;
	width: 100%;
	margin: 0 8px 8px 8px;
	overflow-y: scroll;
`

const Agenda = () => {
	const { events, disabledVenues } = useEventContext()

	const filteredEvents = useMemo(() => {
		return events.filter(e => {
			return !disabledVenues.includes(e.venue)
		})
	}, [disabledVenues, events])

	const hasEvents = useMemo(() => {
		return filteredEvents.length > 0
	}, [filteredEvents])

	if (!hasEvents) return <Loading />

	return (
		<Container>
			<ScrollBox>
				{filteredEvents.map(e => (
					<EventListItem key={e.id} event={e} />
				))}
			</ScrollBox>
		</Container>
	)
}

export default memo(Agenda)
