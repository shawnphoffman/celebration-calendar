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
