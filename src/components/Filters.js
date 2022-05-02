import { memo, useMemo } from 'react'
import { styled } from 'linaria/react'

import rawEvents from '../data/schedule.json'
import { colorMap, getVenues } from '../utils/eventUtils'

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
`

const Indicator = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: ${props => colorMap[props.name]};
	margin-right: 8px;
	filter: none;
`

const Filters = () => {
	const venues = useMemo(() => Array.from(getVenues(rawEvents)).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })), [])

	return (
		<Wrapper>
			{venues.map(v => (
				<Venue key={v}>
					<Indicator name={v} />
					{v}
				</Venue>
			))}
		</Wrapper>
	)
}

export default memo(Filters)
