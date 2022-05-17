import { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'linaria/react'

import EventListItem from 'components/events/EventListItem'
import Loading from 'components/Loading'
import { PageTitle } from 'components/styles'
import { useEventContext } from 'context/EventContext'

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	overflow-x: hidden;
	background: var(--bg);
	border-radius: 8px;
	flex-direction: column;
	align-items: center;
`

const EventDetails = () => {
	const [state] = useEventContext()
	const { id } = useParams()

	const isLoading = useMemo(() => {
		return !state || !state.allEvents || state.allEvents === []
	}, [state])

	const event = useMemo(() => {
		if (isLoading) return null
		return state.allEvents.find(e => e.id === id)
	}, [id, isLoading, state.allEvents])

	return (
		<Container>
			<PageTitle>Event Details</PageTitle>
			{isLoading ? <Loading /> : event ? <EventListItem event={event} key={event.id} forceOpen /> : <div>Invalid Event</div>}
		</Container>
	)
}

export default memo(EventDetails)
