import React, { memo } from 'react'
import { styled } from 'linaria/react'

import Loading from 'components/Loading'
import PrintEvent from 'components/print/PrintEvent'
import { useEventContext } from 'context/EventContext'

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 8px;

	@media print {
		display: block;
		position: relative;
		page-break-inside: inherit;
		break-inside: inherit;
	}
`
const PrintSchedule = () => {
	const [state] = useEventContext()

	if (!state || state?.allVenues.length === state?.disabledVenues?.length) {
		return <Loading />
	}

	return (
		<Container>
			{state.allEvents.map(e => {
				if (state.disabledVenues.includes(e.venue)) return null
				return <PrintEvent key={e.id} event={e} />
			})}
		</Container>
	)
}

export default memo(PrintSchedule)
