import { memo, useCallback, useMemo } from 'react'
import { styled } from 'linaria/react'

import { EventAction, useEventContext } from 'context/EventContext'

import { cleanVenueName, colorMap } from '../../utils/dataUtils'

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 4px;
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
	background: var(--outline);

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
	color: ${props => (props.enabled ? colorMap[props.name] ?? 'var(--text)' : 'var(--text)')};

	${VenueWrapper}:hover & {
		color: ${props => colorMap[props.name] ?? 'var(--text)'};
	}
`

const Venue = memo(({ enabled, name }) => {
	const cleanName = useMemo(() => {
		return cleanVenueName(name)
	}, [name])

	return (
		<VenueWrapper enabled={enabled}>
			<Indicator name={cleanName} enabled={enabled} key={`i-${name}-${enabled}`}>
				<i className={`fa-solid ${enabled ? 'fa-circle' : 'fa-circle-dashed'}`}></i>
			</Indicator>
			<VenueName enabled={enabled}>{cleanName.trim()}</VenueName>
		</VenueWrapper>
	)
})
Venue.displayName = 'Venue'

const Filters = memo(() => {
	const [state, dispatch] = useEventContext()

	const handleClick = useCallback(name => () => dispatch({ type: EventAction.TOGGLE_VENUE, name }), [dispatch])

	const handleAllOn = useCallback(() => dispatch({ type: EventAction.ALL_VENUES_ON }), [dispatch])
	const handleAllOff = useCallback(() => dispatch({ type: EventAction.ALL_VENUES_OFF }), [dispatch])

	if (!state?.allVenues) return null

	return (
		<Wrapper>
			{state.allVenues.map(v => (
				<div key={v} onClick={handleClick(v)}>
					<Venue enabled={!state.disabledVenues.includes(v)} name={v} />
				</div>
			))}
			<div onClick={handleAllOn}>
				<VenueWrapper enabled>
					<Indicator enabled>
						<i className="fa-solid fa-check" />
					</Indicator>
					<VenueName enabled>All On</VenueName>
				</VenueWrapper>
			</div>
			<div onClick={handleAllOff}>
				<VenueWrapper enabled>
					<Indicator enabled>
						<i className="fa-solid fa-close" />
					</Indicator>
					<VenueName enabled>All Off</VenueName>
				</VenueWrapper>
			</div>
		</Wrapper>
	)
})
Filters.displayName = 'Filters'

export default Filters
