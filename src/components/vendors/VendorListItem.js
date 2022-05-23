import React, { memo, useCallback, useMemo, useState } from 'react'
import { styled } from 'linaria/react'

import FavoriteVendorIcon from './FavoriteVendorIcon'

const ExclusiveLink = styled.a`
	color: var(--linkAlt);
	font-size: 12px;
	font-weight: bold;
	margin-top: 8px;
	margin-left: 8px;
	display: flex;

	&:hover {
		color: var(--linkHover);
	}
`

const Exclusives = styled.div`
	margin-top: 8px;
`

const Details = styled.div`
	display: flex;
	flex-direction: column;
`

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

	@media (max-width: 600px) {
		flex-direction: column;
	}
`
const UrlIcon = styled.i`
	margin-left: 4px;
`

const ExpandIcon = styled.span`
	color: var(--linkHover);
	margin-top: 4px;
	font-size: 20px;
	cursor: pointer;
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
	width: 6px;
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

const VendorListItem = ({ vendor, forceOpen }) => {
	const [expanded, setExpanded] = useState(forceOpen)

	const handleClick = useCallback(() => {
		if (!forceOpen && vendor.description) {
			setExpanded(prev => !prev)
		}
	}, [forceOpen, vendor.description])

	const canExpand = useMemo(() => {
		return vendor.description || vendor.url
	}, [vendor])

	return (
		<Container onClick={handleClick}>
			<ColorBlock color={vendor.featured ? 'var(--fallback)' : null} />
			<Booth>{vendor.booth.join('\n')}</Booth>
			<Event>
				<Title>{vendor.company}</Title>
				{expanded && (
					<Expanded>
						{vendor.images.small && <Photo src={vendor.images.small} alt="" />}
						<Details>
							<Description>{vendor.description}</Description>
							{vendor.specials && (
								<Exclusives>
									<div>Vendor Exclusives:</div>
									{vendor.specials.map(e => (
										<ExclusiveLink as={e.link ? 'a' : 'div'} href={e.link} key={e.id}>
											{'- '}
											{e.title} ${e.price || '?'}
										</ExclusiveLink>
									))}
								</Exclusives>
							)}
							{vendor.url && (
								<EventLink href={vendor.url} target="_blank" rel="noreferrer">
									Visit store URL <UrlIcon className="fa-solid fa-up-right-from-square"></UrlIcon>
								</EventLink>
							)}
						</Details>
					</Expanded>
				)}
			</Event>
			<ActionWrapper>
				<FavoriteVendorIcon vendor={vendor} />
				{canExpand && (
					<ExpandIcon>
						<i className="fa-solid fa-arrows-from-line"></i>
					</ExpandIcon>
				)}
			</ActionWrapper>
		</Container>
	)
}

export default memo(VendorListItem)
