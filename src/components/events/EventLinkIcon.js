import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { generatePath } from 'react-router-dom'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'
import copy from 'copy-to-clipboard'

import Routes from 'config/routes'
import Event from 'utils/events'

export const Button = styled.div`
	color: ${p => (p.copied ? 'var(--green)' : 'var(--linkAlt)')};
	font-size: 26px;
	margin-top: 4px;
	transition: all 0.5s;
	cursor: pointer;

	&:hover {
		color: ${p => (p.copied ? 'var(--green)' : 'var(--linkHover)')};
	}
`

const EventLinkIcon = ({ event }) => {
	const [copied, setCopied] = useState(false)

	const url = useMemo(() => `${window.location.origin}/#${generatePath(Routes.EventDetails.path, { id: event.id })}`, [event.id])

	const logCopy = useCallback(
		e => {
			e.stopPropagation()
			copy(url)
			setCopied(true)
			Panelbear.track(Event.EventLinkCopied)
		},
		[url]
	)

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

	return (
		<Button copied={copied} key={`link-${event.id}-${copied}`} onClickCapture={logCopy} title="Copy Link to Event">
			{copied ? <i className="fa-light fa-clipboard-check fa-beat-fade"></i> : <i className="fa-light fa-clipboard"></i>}
		</Button>
	)
}

export default memo(EventLinkIcon)
