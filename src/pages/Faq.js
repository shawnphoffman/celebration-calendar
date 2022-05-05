import { memo } from 'react'

import { Header, List, ListItem, Wrapper } from 'components/styles'

const Faq = () => {
	return (
		<Wrapper>
			<Header>FAQ</Header>
			<h3>Why can't I download events on Chrome iOS?</h3>
			<div>This is an open bug with Chromium. They won't fix it. 😩</div>
			<h3>What are the show hours?</h3>
			<List>
				<ListItem>Thursday, May 26: 10:00 AM* – 7:00 PM</ListItem>
				<ListItem>Friday, May 27: 10:00 AM* – 7:00 PM</ListItem>
				<ListItem>Saturday, May 28: 10:00 AM* – 7:00 PM</ListItem>
				<ListItem>Sunday, May 29: 10:00 AM* – 5:00 PM</ListItem>
				<ListItem>*Jedi Master VIP tickets may access the Exhibit Hall at 9:30 AM.</ListItem>
			</List>
		</Wrapper>
	)
}

export default memo(Faq)
