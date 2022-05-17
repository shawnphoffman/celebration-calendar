import React, { memo } from 'react'
import { styled } from 'linaria/react'

const Photo = styled.img`
	margin-top: 8px;
	margin-right: 8px;
	border-radius: 16px;
	max-width: 120px;
`

const Expanded = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
`

const Container = styled.div`
	display: flex;
	flex-direction: row;
	border-bottom: 2px solid var(--bg);
	cursor: pointer;
`
const Event = styled.div`
	padding: 16px;
	flex: 1;
	background: var(--outline);
	color: var(--text);

	${Container}:hover & {
		background: var(--outlineHover);
	}
`
const Title = styled.div`
	font-weight: bold;
	font-size: 16px;
`
const ColorBlock = styled.div`
	width: 12px;
	background-color: ${e => e.color ?? `var(--link)`};
`
const Description = styled.div`
	font-size: 12px;
	margin-top: 8px;
	white-space: pre-line;
`

const TattooListItem = ({ venue }) => {
	return (
		<Container>
			<ColorBlock color={venue.featured ? 'var(--fallback)' : null} />
			<Event>
				<Title>{venue.company}</Title>
				<Expanded>
					<Photo src={venue.images.small} alt="" />
					<Description>{venue.description}</Description>
				</Expanded>
			</Event>
		</Container>
	)
}

export default memo(TattooListItem)
