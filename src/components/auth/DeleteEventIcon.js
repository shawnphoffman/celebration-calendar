import { memo, useCallback, useEffect, useState } from 'react'
import { useDatabase, useUser } from 'reactfire'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'
import { ref, set } from 'firebase/database'

import Event from 'utils/events'

export const Button = styled.div`
	color: ${p => (p.confirm ? 'red' : 'var(--linkAlt)')};
	font-size: 26px;
	margin-top: 4px;
	transition: all 0.5s;
	cursor: pointer;

	&:hover {
		color: ${p => (p.confirm ? 'red' : 'var(--linkHover)')};
	}
`

const DeleteEventIcon = ({ event }) => {
	const database = useDatabase()
	const { data: user } = useUser()
	const [confirm, setConfirm] = useState(false)

	// Delete User Event
	const deleteUserEvent = useCallback(
		id => {
			const deleteEventRef = ref(database, `user-events/${user?.uid}/${id}`)
			set(deleteEventRef, null)
			const deleteCustomEventRef = ref(database, `custom-events/${user?.uid}/${id}`)
			set(deleteCustomEventRef, null)
		},
		[database, user?.uid]
	)

	const handleClick = useCallback(() => {
		if (confirm) {
			deleteUserEvent(event.id)
			Panelbear.track(Event.DeleteCustomEventConfirm)
		} else {
			Panelbear.track(Event.DeleteCustomEvent)
			setConfirm(true)
		}
	}, [confirm, deleteUserEvent, event.id])

	useEffect(() => {
		let t = () => {}
		if (confirm) {
			t = setTimeout(() => {
				setConfirm(false)
			}, 8000)
		}
		return () => t
	}, [confirm])

	if (!event) return null

	return (
		<Button
			confirm={confirm}
			key={`link-${event.id}-${confirm}`}
			title={confirm ? 'Are you sure?' : 'Delete User Event'}
			onClick={handleClick}
		>
			{confirm ? <i className="fa-light fa-trash-can-check fa-beat-fade"></i> : <i className="fa-light fa-trash-can"></i>}
		</Button>
	)
}

export default memo(DeleteEventIcon)
