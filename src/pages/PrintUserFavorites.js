import { memo, useMemo } from 'react'
import { useDatabase, useDatabaseObjectData, useUser } from 'reactfire'
import { ref } from 'firebase/database'
import { styled } from 'linaria/react'

import PrintEvent from 'components/print/PrintEvent'
import { useEventContext } from 'context/EventContext'
import { useFavoritesContext } from 'context/FavoritesContext'

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

const PrintUserFavorites = () => {
	const [state] = useEventContext()
	const { favorites: ids } = useFavoritesContext()
	const database = useDatabase()
	const { data: user } = useUser()

	// ============================================================

	// User Events Ref
	const userEventsRef = useMemo(() => {
		if (!user) return ref(database, `wow`)
		return ref(database, `user-events/${user?.uid}`)
	}, [database, user])

	// User Events Resp
	const userEventsRep = useDatabaseObjectData(userEventsRef, {})

	// User Events
	const userEvents = useMemo(() => {
		if (userEventsRep?.status !== 'success' || !userEventsRep?.data) return []
		if (!userEventsRep?.data) {
			return []
		} else {
			return Object.values(userEventsRep.data).sort((a, b) => {
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
	}, [userEventsRep?.data, userEventsRep?.status])

	// ============================================================

	// Custom Events Ref
	const customEventsRef = useMemo(() => {
		return ref(database, `custom-events`)
	}, [database])

	// Custom Events Resp
	const customEventsRep = useDatabaseObjectData(customEventsRef, {})

	// All Events
	const customEvents = useMemo(() => {
		if (!state || !state.allEvents) return []
		if (customEventsRep?.status !== 'success' || !customEventsRep?.data) {
			return []
		} else {
			return Object.keys(customEventsRep.data).reduce((memo, curr) => {
				memo = [...memo, ...Object.values(customEventsRep.data[curr])]
				return memo
			}, [])
		}
	}, [customEventsRep.data, customEventsRep?.status, state])
	// ============================================================

	const favorites = useMemo(() => {
		if (!state?.allEvents) return []

		const savedFavorites = state.allEvents.filter(e => {
			return ids.includes(e.id)
		})

		const savedCustomEvents = customEvents.filter(e => {
			return ids.includes(e.id)
		})

		const rawFavorites = [...savedFavorites, ...userEvents, ...savedCustomEvents]

		return rawFavorites.sort((a, b) => {
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
	}, [customEvents, ids, state.allEvents, userEvents])

	return (
		<Container>
			{favorites.map(event => (
				<PrintEvent event={event} key={event.id} />
			))}
		</Container>
	)
}

export default memo(PrintUserFavorites)
