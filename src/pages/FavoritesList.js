import { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { equalTo, orderByValue, query, ref } from 'firebase/database'
import { styled } from 'linaria/react'

import EventListItem from 'components/events/EventListItem'
import Loading from 'components/Loading'
import { PageTitle } from 'components/styles'
import { useEventContext } from 'context/EventContext'

const NoFavorites = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 0;
	margin-top: 16px;
	font-weight: bold;
`
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

const Favorites = () => {
	const [state] = useEventContext()
	const { uid } = useParams()
	const database = useDatabase()

	// ============================================================

	// Shared Favorites Query
	const sharedFavQ = useMemo(() => {
		const sharedFavRef = ref(database, `user-favorites/${uid}`)
		const sharedFavQuery = query(sharedFavRef, orderByValue())
		return query(sharedFavQuery, equalTo('true'))
	}, [database, uid])

	// Shared Favorites Resp
	const sharedFavResp = useDatabaseObjectData(sharedFavQ, {})

	// Shared Favorites
	const sharedFaveIds = useMemo(() => {
		if (sharedFavResp?.status !== 'success' || !sharedFavResp?.data) return []
		return Object.keys(sharedFavResp?.data) || []
	}, [sharedFavResp?.data, sharedFavResp?.status])

	// ============================================================

	const hasFavorites = useMemo(() => {
		return !!sharedFaveIds.length && sharedFavResp?.status === 'success'
	}, [sharedFavResp?.status, sharedFaveIds.length])

	const favorites = useMemo(() => {
		if (!state?.allEvents) return []
		return state.allEvents.filter(e => {
			return sharedFaveIds.includes(e.id)
		})
	}, [sharedFaveIds, state.allEvents])

	return (
		<Container>
			<PageTitle>Shared Favorites</PageTitle>
			<ScrollBox>
				{sharedFavResp?.status !== 'success' && <Loading />}
				{!hasFavorites && <NoFavorites>No favorites to display...</NoFavorites>}
				{favorites.map(event => (
					<EventListItem event={event} key={event.id} forceOpen />
				))}
			</ScrollBox>
		</Container>
	)
}

export default memo(Favorites)
