import { memo } from 'react'

import { Header, Section, Wrapper } from 'components/styles'

const Favorites = () => {
	return (
		<Wrapper>
			<Header>Favorites</Header>
			<Section>
				<h3>Coming soon...</h3>
			</Section>
		</Wrapper>
	)
}

export default memo(Favorites)
