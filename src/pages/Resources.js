import { memo } from 'react'

import { Header, List, ListItem, Wrapper } from 'components/styles'

const Resources = () => {
	return (
		<Wrapper>
			<Header>Additional Resources</Header>
			<List>
				<ListItem>
					<a href="https://www.starwarscelebration.com/en-us/explore-the-show.html" target="_blank" rel="noreferrer">
						Official Show Info <i class="fa-solid fa-up-right-from-square"></i>
					</a>
				</ListItem>
				{/* <ListItem>Resource 2</ListItem>
				<ListItem>Resource 3</ListItem>
				<ListItem>Resource 4</ListItem>
				<ListItem>Resource 5</ListItem> */}
			</List>
		</Wrapper>
	)
}

export default memo(Resources)
