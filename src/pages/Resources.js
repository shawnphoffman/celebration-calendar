import { memo } from 'react'
import { styled } from 'linaria/react'

import { List, ListItem, NonScrollWrapper, PageTitle, Section } from 'components/styles'

const Link = styled.a`
	color: var(--link);
	&:hover {
		color: var(--linkHover);
	}
`
const LinkItem = memo(({ href, children }) => {
	return (
		<ListItem>
			<Link href={href} target="_blank" rel="noreferrer">
				{children} <i className="fa-solid fa-up-right-from-square"></i>
			</Link>
		</ListItem>
	)
})

const Resources = () => {
	return (
		<NonScrollWrapper>
			<PageTitle>Additional Resources</PageTitle>
			<Section>
				<List>
					<LinkItem href="https://www.starwarscelebration.com/en-us/explore-the-show.html">Official Show Info</LinkItem>
					<LinkItem href="https://github.com/shawnphoffman/celebration-calendar">Project Source</LinkItem>
					<LinkItem href="https://twitter.com/iceplanethoff">
						<i className="fa-brands fa-twitter"></i> Follow me on Twitter
					</LinkItem>
				</List>
			</Section>
		</NonScrollWrapper>
	)
}

export default memo(Resources)
