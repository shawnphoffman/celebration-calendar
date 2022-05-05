import { memo, useMemo } from 'react'
import { styled } from 'linaria/react'

import { useEventContext } from 'context/EventContext'
import colors from 'utils/colors'

import { colorMap } from '../utils/eventUtils'

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 8px;
	max-width: 1200px;
	flex: 0;
`

const VenueWrapper = styled.div`
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
	background: ${colors.darkBg};
	color: white !important;

	&:hover {
		text-decoration: ${props => (props.enabled ? 'underline' : 'none')};
	}
`

const VenueName = styled.span`
	text-decoration: ${props => (props.enabled ? 'none' : 'line-through')};
`

const Indicator = styled.div`
	margin-right: 8px;
	filter: none;
	color: ${props => (props.enabled ? colorMap[props.name] : colors.darkInactive)};
`

const Venue = memo(({ enabled, name, onClick }) => {
	const cleanName = useMemo(() => {
		return name.replace('The ', '')
	}, [name])
	return (
		<VenueWrapper onClick={onClick} enabled={enabled}>
			<Indicator name={cleanName} enabled={enabled} key={`i-${name}-${enabled}`}>
				<i className={`fa-solid ${enabled ? 'fa-circle' : 'fa-circle-dashed'}`}></i>
			</Indicator>
			<VenueName enabled={enabled}>{cleanName}</VenueName>
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
