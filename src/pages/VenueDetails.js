import { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'linaria/react'

import Loading from 'components/Loading'
import { PageTitle } from 'components/styles'
import EventListItem from 'components/v2/EventListItem'
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
const ScrollBox = styled.div`
	width: 100%;
	overflow-y: scroll;
	::-webkit-scrollbar-corner {
		background: var(--transparent);
	}
`
const Invalid = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 0;
	margin-top: 16px;
	font-weight: bold;
`

const VenueDetails = () => {
	const [state] = useEventContext()
	const { venue } = useParams()

	const isLoading = useMemo(() => {
		return !state || !state.allEvents || state.allEvents === []
	}, [state])

	const events = useMemo(() => {
		if (isLoading) return null
		const lowerVenue = venue.toLowerCase()
		return state.allEvents.filter(e => e.venue.trim().toLowerCase() === lowerVenue)
	}, [venue, isLoading, state.allEvents])

	const hasEvents = useMemo(() => {
		return events && events.length > 0
	}, [events])

	return (
		<Container>
			<PageTitle>Events in "{venue}"</PageTitle>
			<ScrollBox>
				{isLoading ? (
					<Loading />
				) : hasEvents ? (
					events.map(e => <EventListItem event={e} key={e.id} forceOpen />)
				) : (
					<Invalid>Invalid Venue</Invalid>
				)}
			</ScrollBox>
		</Container>
	)
}

export default memo(VenueDetails)
