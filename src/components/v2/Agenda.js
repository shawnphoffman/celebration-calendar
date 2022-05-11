import React, { memo, Suspense } from 'react'
import { styled } from 'linaria/react'

import Loading from 'components/Loading'
import { useEventContext } from 'context/EventContext'

import EventListItem from './EventListItem'

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	overflow-x: hidden;
	background: var(--outline);
	border-radius: 8px;
`
const ScrollBox = styled.div`
	/* color: black; */
	width: 100%;
	overflow-y: scroll;
	::-webkit-scrollbar-corner {
		background: rgba(0, 0, 0, 0);
	}
`

const Agenda = () => {
	const [state] = useEventContext()

	if (!state || !state.filteredEvents || state.filteredEvents.length < 1) return <Loading />

	// console.log('Agenda.render', {
	// 	state,
	// })

	return (
		<Container test-id="agenda-container">
			<ScrollBox>
				<Suspense fallback={<Loading />}>
					{state.filteredEvents.map(e => (
						<EventListItem key={e.id} event={e} />
					))}
				</Suspense>
			</ScrollBox>
		</Container>
	)
}

export default memo(Agenda)
