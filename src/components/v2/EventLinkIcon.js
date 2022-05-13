import { memo, useCallback, useEffect, useState } from 'react'
import { generatePath } from 'react-router-dom'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

import Routes from 'config/routes'
import Event from 'utils/events'

export const Button = styled.a`
	color: ${p => (p.copied ? 'var(--green)' : 'var(--linkAlt)')};
	font-size: 24px;
	margin-top: 4px;
	transition: all 0.5s;
	cursor: pointer;

	&:hover {
		color: var(--linkHover);
	}
`

const EventLinkIcon = ({ event }) => {
	const [copied, setCopied] = useState(false)
	const logCopy = useCallback(e => {
		e.stopPropagation()
		setCopied(true)
		Panelbear.track(Event.LinkOpened)
	}, [])

	useEffect(() => {
		let t = () => {}
		if (copied) {
			t = setTimeout(() => {
				setCopied(false)
			}, 3000)
		}
		return () => t
	}, [copied])

	if (!event) return null

	const url = `${window.location.origin}/#${generatePath(Routes.EventDetails.path, { id: event.id })}`

	return (
		<Button
			href={url}
			target="_blank"
			rel="noreferrer"
			copied={copied}
			key={`link-${event.id}-${copied}`}
			onClickCapture={logCopy}
			title="Open Link to Event"
		>
			{copied ? <i className="fa-light fa-check"></i> : <i className="fa-light fa-up-right-from-square"></i>}
		</Button>
	)
}

export default memo(EventLinkIcon)
