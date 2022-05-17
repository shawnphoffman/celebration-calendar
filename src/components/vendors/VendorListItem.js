import React, { memo, useCallback, useMemo, useState } from 'react'
import { styled } from 'linaria/react'

const UrlIcon = styled.i`
	margin-left: 4px;
`

const ExpandIcon = styled.span`
	color: var(--linkHover);
	margin-left: 16px;
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
const Booth = styled.div`
	background-color: ${p => p.bg};
	color: var(--text);
	/* writing-mode: vertical-lr; */
	display: flex;
	justify-content: center;
	/* transform: rotate(180deg); */
	padding: 8px;
	font-size: 18px;
	font-weight: bold;
	flex: 0 1 60px;
	white-space: pre;
	align-items: center;
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
const EventLink = styled.a`
	color: var(--linkAlt);
	font-size: 12px;
	font-weight: bold;
	margin-top: 8px;
	display: flex;

	&:hover {
		color: var(--linkHover);
	}
`
const ActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: var(--outline);
	padding: 8px;
	/* Accommodate scroll bars */
	padding-right: 12px;

	${Container}:hover & {
		background: var(--outlineHover);
	}
`

const VendorListItem = ({ venue, forceOpen = false }) => {
	const [expanded, setExpanded] = useState(forceOpen)

	const handleClick = useCallback(() => {
		if (!forceOpen && venue.description) {
			setExpanded(prev => !prev)
		}
	}, [forceOpen, venue.description])

	const canExpand = useMemo(() => {
		return venue.description || venue.url
	}, [venue])

	return (
		<Container onClick={handleClick}>
			<ColorBlock color={venue.featured ? 'var(--fallback)' : null} />
			<Booth>{venue.booth.join('\n')}</Booth>
			<Event>
				<Title>
					{venue.company}
					{canExpand && (
						<ExpandIcon>
							<i className="fa-solid fa-arrows-from-line"></i>
						</ExpandIcon>
					)}
				</Title>
				{/* TAGS */}
				{/* <div>
					{venue.tags.map(t => (
						<div key={t.id}>{decodeEntities(t.tag)}</div>
					))}
				</div> */}
				{/* <Details>
					<NoWrap>
						{time.start} - {time.end}
					</NoWrap>
					<NoWrap>({event.venue.trim()})</NoWrap>
				</Details> */}
				{expanded && (
					<>
						<Description>{venue.description}</Description>
						{venue.url && (
							<EventLink href={venue.url} target="_blank" rel="noreferrer">
								Visit store URL <UrlIcon className="fa-solid fa-up-right-from-square"></UrlIcon>
							</EventLink>
						)}
					</>
				)}
			</Event>
			<ActionWrapper>
				{/* <FavoriteIcon event={event} />
				{expanded && (
					<>
						<DownloadIcon event={event} />
						<EventLinkIcon event={event} />
					</>
				)} */}
			</ActionWrapper>
		</Container>
	)
}

export default memo(VendorListItem)
