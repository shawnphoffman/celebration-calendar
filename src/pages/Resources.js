import { memo } from 'react'

import { Header, List, ListItem, Section, Wrapper } from 'components/styles'

const Link = memo(({ url, children }) => {
	return (
		<ListItem>
			<a href={url} target="_blank" rel="noreferrer">
				{children} <i className="fa-solid fa-up-right-from-square"></i>
			</a>
		</ListItem>
	)
})

const Resources = () => {
	return (
		<Wrapper>
			<Header>Additional Resources</Header>
			<Section>
				<List>
					<Link href="https://www.starwarscelebration.com/en-us/explore-the-show.html">Official Show Info</Link>
					<Link href="https://github.com/shawnphoffman/celebration-calendar">Project Source</Link>
					<Link href="https://twitter.com/iceplanethoff">
						<i className="fa-brands fa-twitter"></i> Follow me on Twitter
					</Link>
				</List>
			</Section>
		</Wrapper>
	)
}

export default memo(Resources)
