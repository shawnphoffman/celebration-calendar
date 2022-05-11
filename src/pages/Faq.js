import { memo } from 'react'
import { styled } from 'linaria/react'

import { List, ListItem, NonScrollWrapper, PageTitle, Section } from 'components/styles'
import Event from 'utils/events'

const SectionTitle = styled.h3`
	margin-bottom: 16px;
	margin-top: 0px;
`

const Faq = () => {
	return (
		<NonScrollWrapper>
			<PageTitle>FAQ</PageTitle>
			<Section>
				<SectionTitle>Why can't I download events on Chrome iOS?</SectionTitle>
				<div>This is an open bug with Chromium. They won't fix it. 😩</div>
			</Section>
			<Section>
				<SectionTitle>What are the show hours?</SectionTitle>
				<List>
					<ListItem>Thursday, May 26: 10:00 AM* – 7:00 PM</ListItem>
					<ListItem>Friday, May 27: 10:00 AM* – 7:00 PM</ListItem>
					<ListItem>Saturday, May 28: 10:00 AM* – 7:00 PM</ListItem>
					<ListItem>Sunday, May 29: 10:00 AM* – 5:00 PM</ListItem>
					<ListItem>*Jedi Master VIP tickets may access the Exhibit Hall at 9:30 AM.</ListItem>
				</List>
			</Section>
			<Section>
				<SectionTitle>What events does this site capture?</SectionTitle>
				<div>
					This site doesn't capture personal information. The only data that is recorded is event data based on usage. We use PanelBear to
					track the following events without PII attached. <strong>{Object.keys(Event).join(', ')}</strong>
				</div>
			</Section>
		</NonScrollWrapper>
	)
}

export default memo(Faq)
