import { memo } from 'react'
import { styled } from 'linaria/react'

import { List, ListItem, NonScrollWrapper, PageTitle, Section } from 'components/styles'
import Event from 'utils/events'

const SectionTitle = styled.h3`
	margin-bottom: 16px;
	margin-top: 0px;
`
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

const Faq = () => {
	return (
		<NonScrollWrapper>
			{/*  */}
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
			{/*  */}
			<PageTitle>Recommendations</PageTitle>
			<Section>
				<List>
					<ListItem>
						<i>Coming Soon...</i>
					</ListItem>
				</List>
			</Section>
			{/*  */}
			<PageTitle>FAQ</PageTitle>
			<Section>
				<SectionTitle>Why can't I download events on Chrome iOS?</SectionTitle>
				<div>This is an open bug with Chromium. They won't fix it. 😩</div>
			</Section>
			<Section>
				<SectionTitle>Can I add an event to the schedule?</SectionTitle>
				<div>
					Absolutely. Please reach out{' '}
					<Link href="https://twitter.com/iceplanethoff" target="_blank" rel="noreferrer">
						on Twitter
					</Link>{' '}
					and I'll get it added.
				</div>
			</Section>
			<Section>
				<SectionTitle>What data does this site capture or track?</SectionTitle>
				<div>
					This site doesn't record any personal information. The only data that is recorded is event data to help me understand what people
					are using. I use PanelBear to track the following events without PII attached. <strong>{Object.keys(Event).join(', ')}</strong>
				</div>
			</Section>
		</NonScrollWrapper>
	)
}

export default memo(Faq)
