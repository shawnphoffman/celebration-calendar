import { memo, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useDatabase, useDatabaseObjectData, useSigninCheck, useUser } from 'reactfire'
import { ref } from 'firebase/database'
import { styled } from 'linaria/react'

import CopyUrlIcon from 'components/events/CopyUrlIcon'
import EventListItem from 'components/events/EventListItem'
import { PageTitle } from 'components/styles'
import Routes from 'config/routes'
import { useEventContext } from 'context/EventContext'
import { useFavoritesContext } from 'context/FavoritesContext'

const Divider = styled.hr`
	width: 100%;
	border-color: red;
`
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
const LoginPrompt = styled.div`
	margin-bottom: 8px;
`
const Link = styled(NavLink)`
	color: var(--linkAlt);
	font-weight: bold;
	text-decoration: none;

	&:hover {
		color: var(--linkHover);
	}
`

const Favorites = () => {
	const [state] = useEventContext()
	const { favorites: ids } = useFavoritesContext()
	const { status, data: signInCheckResult } = useSigninCheck()
	const database = useDatabase()
	const { data: user } = useUser()

	const hasFavorites = useMemo(() => {
		return !!ids.length
	}, [ids])

	const showLoginPrompt = useMemo(() => {
		return status === 'success' && !signInCheckResult?.signedIn
	}, [status, signInCheckResult])

	const favorites = useMemo(() => {
		if (!state?.allEvents) return []
		return state.allEvents.filter(e => {
			return ids.includes(e.id)
		})
	}, [ids, state.allEvents])

	// ============================================================

	// User Events Ref
	const userEventsRef = useMemo(() => {
		return ref(database, `user-events/${user?.uid}`)
	}, [database, user])

	// User Events Resp
	const userEventsRep = useDatabaseObjectData(userEventsRef, {})

	// User Events
	const userEvents = useMemo(() => {
		if (userEventsRep?.status !== 'success' || !userEventsRep?.data) return null
		if (!userEventsRep?.data) {
			return null
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

	return (
		<Container>
			<PageTitle>
				Your Favorited Events <CopyUrlIcon />
			</PageTitle>
			{showLoginPrompt && (
				<>
					<LoginPrompt>
						If you <Link to={Routes.Login.path}>log in</Link>, we'll save your favorites across your devices!
					</LoginPrompt>
				</>
			)}
			<ScrollBox>
				{!hasFavorites && !userEvents && <NoFavorites>No favorites to display...</NoFavorites>}
				{userEvents && userEvents.map(event => <EventListItem event={event} key={event.id} forceOpen />)}
				{hasFavorites && userEvents && <Divider />}
				{favorites.map(event => (
					<EventListItem event={event} key={event.id} forceOpen />
				))}
			</ScrollBox>
		</Container>
	)
}

export default memo(Favorites)
