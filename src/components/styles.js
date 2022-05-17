import { NavLink } from 'react-router-dom'
import { styled } from 'linaria/react'

export const NonScrollWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0 16px;
	width: 100%;
	align-items: center;
	flex: 0;
`

export const PageTitle = styled.h2`
	margin: 8px 0px 16px 0px;
	color: var(--linkAlt);
	display: flex;
`

export const List = styled.ul`
	margin: 0px;
	padding-inline-start: 0px;
	text-align: center;
`

export const ListItem = styled.li`
	margin-bottom: 16px;
	list-style: none;
`

export const Section = styled.div`
	margin-bottom: 32px;
	text-align: center;
`

export const NavIcon = styled(NavLink)`
	color: var(--link);
	font-size: 24px;
	margin: 4px 8px;

	&:hover {
		color: var(--linkHover);
	}
	&.active {
		color: var(--linkActive);
	}
`

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	background-color: var(--inputBg);
	border-color: none;
	border-width: 1px;
	border-style: solid;
	transition-delay: 0s;
	transition-duration: 0.2s;
	transition-property: box-shadow;
	transition-timing-function: ease-in-out;
	border-radius: 8px;
	user-select: none;
	margin-bottom: 16px;
	max-width: 1200px;
	width: 100%;

	&:hover {
		opacity: 0.8;
	}

	&:focus-within {
		border-color: var(--linkActive);
		box-shadow: 0 0 0 2px var(--inputBg);
		opacity: 1;
	}
`

export const Input = styled.input`
	margin: 0;
	padding: 16px;
	font-size: 16px;
	line-height: 24px;
	text-align: start;
	text-indent: 0px;
	text-transform: none;
	word-spacing: 0px;
	border-color: var(--inputBorder);
	border-style: solid;
	border-width: 0;
	background-color: var(--transparent);
	opacity: 1;
	flex: 1;

	&:focus {
		outline-style: none;
		box-shadow: none;
		border-color: var(--transparent);
	}
`
