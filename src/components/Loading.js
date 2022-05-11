import { memo } from 'react'
import { styled } from 'linaria/react'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 0;
`
const Spinner = styled.div`
	font-size: 46px;
	margin: 16px;
`

const Loading = memo(() => {
	return (
		<Wrapper>
			<Spinner>
				<i className="fa-brands fa-galactic-republic fa-beat"></i>
			</Spinner>
		</Wrapper>
	)
})

export default Loading
