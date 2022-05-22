import { memo } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'linaria/react'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`

const StyledButton = styled(Link)`
	color: var(--inputBg);
	background: var(--linkActive);
	border: 2px solid var(--inputBorder);
	font-weight: 700;
	border-radius: 8px;
	text-align: center;
	display: inline-block;

	&:hover {
		color: var(--inputBg);
		background: var(--linkHover);
	}
	text-decoration: none;
	cursor: pointer;

	margin: 8px;
	font-size: 20px;
	padding: 8px 16px;
	min-width: 175px;

	&:disabled {
		background: green !important;
	}
`

const Button = props => {
	const isLink = !!props.to || !!props.href
	const isButton = props.type === 'submit'

	const as = isLink ? Link : isButton ? 'button' : 'div'
	return (
		<Wrapper onClick={() => {}}>
			<StyledButton as={as} {...props} />
		</Wrapper>
	)
}

export default memo(Button)
