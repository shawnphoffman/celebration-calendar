import { memo } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'linaria/react'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`

const StyledButton = styled(Link)`
	color: black;
	border: 2px solid #222;
	font-weight: 700;
	border-radius: 8px;
	background-color: #efefef;
	text-align: center;
	display: inline-block;

	&:hover {
		background-color: ${props => (props.disabled ? '#efefef' : '#dedede')};
	}

	margin: ${props => (props.small ? '8px' : '16px')};
	font-size: ${props => (props.small ? '20px' : '32px')};
	padding: ${props => (props.small ? '8px 16px' : '16px 32px')};
	min-width: ${props => (props.small ? '175px' : '300px')};

	text-decoration: ${props => (props.disabled ? 'line-through' : 'none')};
	cursor: ${props => (props.disabled ? 'default' : 'pointer')};
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
