import { memo, useMemo } from 'react'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { ref } from 'firebase/database'
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

	// ============================================================
	const database = useDatabase()

	// Custom Events Ref
	const customEventsRef = useMemo(() => {
		return ref(database, `custom-events`)
	}, [database])

	// Custom Events Resp
	const customEventsRep = useDatabaseObjectData(customEventsRef, {})

	// All Events
	const allEvents = useMemo(() => {
		if (!state || !state.allEvents) return []
		if (customEventsRep?.status !== 'success' || !customEventsRep?.data) {
			return state.allEvents
		} else {
			const events = Object.keys(customEventsRep.data).reduce(
				(memo, curr) => {
					memo = [...memo, ...Object.values(customEventsRep.data[curr])]
					return memo
				},
				[...state.allEvents]
			)

			return events.sort((a, b) => {
				const aStart = new Date(a.startDate)
				const bStart = new Date(b.startDate)
				const aEnd = new Date(a.endDate)
				const bEnd = new Date(b.endDate)

				if (aStart > bStart) return 1
				if (aStart < bStart) return -1
				if (aEnd > bEnd) return 1
				if (aEnd < bEnd) return -1
				if (a.summary > b.summary) return 1
				if (a.summary < b.summary) return -1
				return 0
			})
		}
	}, [customEventsRep.data, customEventsRep?.status, state])

	if (!state || !allEvents) {
		return <Loading />
	}

	return (
		<Container>
			{allEvents.map(e => {
				if (state.disabledVenues.includes(e.venue)) return null
				return <PrintEvent key={e.id} event={e} />
			})}
		</Container>
	)
}

export default memo(PrintSchedule)
