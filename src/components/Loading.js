import { memo } from 'react'
import { styled } from 'linaria/react'

// Refactor
const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 0;
`

const Title = styled.h1`
	text-align: center;
	font-weight: bold;
	font-size: 2rem;
	color: var(---text);
	margin: 12px 0 12px 48px;
	white-space: nowrap;
`

const Loading = memo(() => {
	return (
		<Header>
			<Title>Loading...</Title>
		</Header>
	)
})

export default Loading
