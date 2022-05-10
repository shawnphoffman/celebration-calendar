import ICalendarLink from 'react-icalendar-link'
import { styled } from '@linaria/react'

import colors from 'utils/colors'

export const Wrapper = styled.div`
	background: ${colors.containerBg};
	margin: 0px 16px 8px 16px;
	border-radius: 8px;
	padding: 8px 8px 8px 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: ${colors.black};
	max-width: 1200px;
	width: 100%;
`
export const ActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 8px;
`
export const ContentWrapper = styled.div`
	flex: 1;
`
export const Title = styled.div`
	font-weight: bold;
`
export const Details = styled.div`
	font-style: italic;
	font-size: 14px;
	margin: 8px 0;

	display: flex;
	flex-wrap: wrap;
`
export const Description = styled.div`
	font-size: 12px;
	margin: 8px 0;
`
export const IconButton = styled.div`
	font-size: 26px;
	color: ${props => props.color ?? 'inherit'};

	&:hover {
		color: ${colors.iconHover};
	}
`
export const Button = styled(ICalendarLink)`
	color: ${colors.download};
	font-size: 26px;

	&:hover {
		color: ${colors.iconHover};
	}
`
export const Day = styled.span`
	margin-right: 8px;
`
export const NoWrap = styled.span`
	margin-right: 8px;
	white-space: nowrap;
`
export const EventLink = styled.a`
	color: ${colors.link};
	font-size: 12px;
	font-weight: bold;

	&:hover {
		color: ${colors.iconHover};
	}
`
