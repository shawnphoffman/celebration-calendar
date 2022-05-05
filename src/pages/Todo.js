import { memo } from 'react'

import { Header, List, Wrapper } from 'components/styles'

const Todo = () => {
	return (
		<Wrapper>
			<Header>Improvements</Header>
			<List>
				<li>Caching API</li>
				<li>Resource Links</li>
				<li>Sentry</li>
			</List>
		</Wrapper>
	)
}

export default memo(Todo)
