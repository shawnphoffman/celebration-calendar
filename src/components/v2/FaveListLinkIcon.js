import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { generatePath } from 'react-router-dom'
import { useSigninCheck, useUser } from 'reactfire'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'
import copy from 'copy-to-clipboard'

import Routes from 'config/routes'
import Event from 'utils/events'

export const Button = styled.div`
	color: ${p => (p.copied ? 'var(--green)' : 'var(--linkAlt)')};
	transition: all 0.5s;
	cursor: pointer;
	margin-left: 8px;

	&:hover {
		color: ${p => (p.copied ? 'var(--green)' : 'var(--linkHover)')};
	}
`

const FaveListLinkIcon = () => {
	const [copied, setCopied] = useState(false)
	const { status, data: signInCheckResult } = useSigninCheck()
	const { data: user } = useUser()

	console.log('ICON', { status, signInCheckResult, user })

	const uid = useMemo(() => (user ? user.uid : null), [user])

	const url = useMemo(() => (!uid ? null : `${window.location.origin}/#${generatePath(Routes.FavoritesList.path, { uid })}`), [uid])

	const logCopy = useCallback(
		e => {
			e.stopPropagation()
			copy(url)
			setCopied(true)
			Panelbear.track(Event.LinkOpened)
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

	if (status !== 'success' || !signInCheckResult?.signedIn || !uid) {
		return null
	}

	return (
		<Button copied={copied} key={`link-${uid}-${copied}`} onClickCapture={logCopy} title="Copy Link to Share">
			{copied ? <i className="fa-light fa-clipboard-check fa-beat-fade"></i> : <i className="fa-light fa-clipboard"></i>}
		</Button>
	)
}

export default memo(FaveListLinkIcon)
