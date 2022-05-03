import { memo } from 'react'

import { Header, List, Wrapper } from 'components/styles'

const Todo = () => {
	return (
		<Wrapper>
			<Header>Improvements</Header>
			<List>
				<li>Fetch events</li>
				<li>Search</li>
				<li>Navigation</li>
				<li>Resource Links</li>
				<li>Persist filters to localstorage</li>
				<li>Sentry</li>
			</List>
		</Wrapper>
	)
}

export default memo(Todo)
