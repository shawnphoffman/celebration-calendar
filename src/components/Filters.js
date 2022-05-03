import { memo } from 'react'
import { styled } from 'linaria/react'

import { useEventContext } from 'context/EventContext'

import { colorMap } from '../utils/eventUtils'

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 8px;
`

const Venue = styled.div`
	background: white;
	padding: 4px 8px;
	font-size: 12px;
	white-space: nowrap;
	margin: 2px 4px;
	border-radius: 4px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	text-decoration: ${props => (props.enabled ? 'none' : 'line-through')};
`

const Indicator = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	margin-right: 8px;
	filter: none;
	background-color: ${props => (props.enabled ? colorMap[props.name] : '#333')};
`

const Filters = () => {
	// const venues = useMemo(() => Array.from(getVenues(rawEvents)).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })), [])
	const { venues, toggleFilter } = useEventContext()

	if (!venues) return null

	// console.log({ venues })

	return (
		<Wrapper>
			{Object.keys(venues).map(v => (
				<Venue key={v} className="venue" enabled={venues[v]} onClick={() => toggleFilter(v)}>
					<Indicator name={v} enabled={venues[v]} />
					{v}
				</Venue>
			))}
		</Wrapper>
	)
}

export default memo(Filters)
