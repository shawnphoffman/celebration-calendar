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
	max-width: 1200px;
`

const VenueWrapper = styled.div`
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
	cursor: pointer;
`

const VenueName = styled.span`
	text-decoration: ${props => (props.enabled ? 'none' : 'line-through')};
`

const Indicator = styled.div`
	margin-right: 8px;
	filter: none;
	color: ${props => (props.enabled ? colorMap[props.name] : '#333')};
`

const Venue = memo(({ enabled, name, onClick }) => {
	return (
		<VenueWrapper onClick={onClick} className="venue">
			<Indicator name={name} enabled={enabled}>
				<i className="fa-solid fa-circle"></i>
			</Indicator>
			<VenueName enabled={enabled}>{name}</VenueName>
		</VenueWrapper>
	)
})

const Filters = memo(() => {
	const { venues, disabledVenues, toggleFilter } = useEventContext()

	if (!venues) return null

	return (
		<Wrapper>
			{venues.map(v => (
				<Venue key={v} enabled={!disabledVenues.includes(v)} name={v} onClick={() => toggleFilter(v)} />
			))}
		</Wrapper>
	)
})

export default Filters
