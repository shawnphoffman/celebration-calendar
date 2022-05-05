import { memo, useMemo } from 'react'
import { styled } from 'linaria/react'

import { useEventContext } from 'context/EventContext'

const Event = styled.div`
	padding: 16px;
	border-bottom: 1px solid black;
`

const Box = styled.div`
	font-size: 2rem;
	background-color: lightgreen;
	color: black;
	width: 100%;
	margin: 0 8px 8px 8px;
	overflow-y: scroll;
`

const Container = styled.div`
	flex: 1;
	width: 100%;
	display: flex;
	justify-content: center;
	overflow-x: hidden;
`

const Agenda = ({ onSelect }) => {
	const { events, disabledVenues } = useEventContext()

	const filteredEvents = useMemo(() => {
		return events.filter(e => {
			return !disabledVenues.includes(e.venue)
		})
	}, [disabledVenues, events])

	return (
		<Container>
			<Box>
				{filteredEvents.map(e => (
					<Event key={e.id}>{e.summary}</Event>
				))}
			</Box>
		</Container>
	)
}

export default memo(Agenda)
