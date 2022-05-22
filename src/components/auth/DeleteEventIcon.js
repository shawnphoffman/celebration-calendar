import { memo, useCallback } from 'react'
import { styled } from '@linaria/react'
// import * as Panelbear from '@panelbear/panelbear-js'

// import Event from 'utils/events'

export const Button = styled.div`
	/* color: var(--red); */
	color: red;
	font-size: 26px;
	margin-top: 4px;
	transition: all 0.5s;
	cursor: pointer;

	&:hover {
		color: var(--linkHover);
	}
`

const DeleteEventIcon = ({ event }) => {
	const handleClick = useCallback(() => {
		console.log('DELETE', event)
	}, [event])

	if (!event) return null

	return (
		<Button title="Delete User Event" onClick={handleClick}>
			<i className="fa-light fa-trash-can"></i>
		</Button>
	)
}

export default memo(DeleteEventIcon)
