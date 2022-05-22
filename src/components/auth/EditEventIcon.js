import { memo, useCallback } from 'react'
import { styled } from '@linaria/react'
// import * as Panelbear from '@panelbear/panelbear-js'

// import Event from 'utils/events'

export const Button = styled.div`
	color: var(--linkAlt);
	font-size: 26px;
	margin-top: 4px;
	transition: all 0.5s;
	cursor: pointer;

	&:hover {
		color: var(--linkHover);
	}
`

const EditEventIcon = ({ event, onEdit }) => {
	const handleClick = useCallback(() => {
		onEdit(event)
	}, [event, onEdit])

	if (!event) return null

	return (
		<Button title="Edit User Event" onClick={handleClick}>
			<i className="fa-light fa-pen-to-square"></i>
		</Button>
	)
}

export default memo(EditEventIcon)
