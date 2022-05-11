import ICalendarLink from 'react-icalendar-link'
import { styled } from '@linaria/react'

export const Wrapper = styled.div`
	background: var(--outline);
	/* margin: 0px 16px 8px 16px; */
	margin-bottom: 8px;
	border-radius: 8px;
	padding: 8px 8px 8px 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: var(--text);
	max-width: 1200px;
	width: 100%;
	border: 3px solid var(--inactive);
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
	color: ${props => (props.pink ? 'var(--heart)' : 'inherit')};

	&:hover {
		color: var(--linkHover);
	}
`
export const Button = styled(ICalendarLink)`
	color: var(--download);
	font-size: 26px;

	&:hover {
		color: var(--linkHover);
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
	color: var(--link);
	font-size: 12px;
	font-weight: bold;

	&:hover {
		color: var(--linkHover);
	}
`
