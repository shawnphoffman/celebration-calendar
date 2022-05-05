import { memo } from 'react'

import { Header, List, ListItem, Wrapper } from 'components/styles'

const Resources = () => {
	return (
		<Wrapper>
			<Header>Additional Resources</Header>
			<List>
				<ListItem>Resource 1</ListItem>
				<ListItem>Resource 2</ListItem>
				<ListItem>Resource 3</ListItem>
				<ListItem>Resource 4</ListItem>
				<ListItem>Resource 5</ListItem>
			</List>
		</Wrapper>
	)
}

export default memo(Resources)
