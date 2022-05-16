import { memo, useCallback, useMemo } from 'react'
import { useAuth } from 'reactfire'
import * as Panelbear from '@panelbear/panelbear-js'
import { styled } from 'linaria/react'

import Button from 'components/Button'
import Event from 'utils/events'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const Username = styled.div`
	font-size: 32px;
	font-weight: bold;
	margin-top: 16px;
	text-align: center;
`
const PhoneIcon = styled.i`
	font-size: 48px;
`
const PhoneNumber = styled.div`
	font-size: 28px;
	font-weight: bold;
	margin-top: 16px;
	text-align: center;
`
const Avatar = styled.img`
	margin: 16px;
	height: 48px;
	width: 48px;
	border: 3px solid #fff;
	box-sizing: content-box;
	border-radius: 8px;
`

const UserProfile = ({ user }) => {
	const auth = useAuth()

	const handleLogout = useCallback(() => {
		auth.signOut().then(() => {
			Panelbear.track(Event.LogOut)
			console.log('signed out')
		})
	}, [auth])

	console.log({ user })

	const provider = useMemo(() => {
		return user?.providerData[0]?.providerId
	}, [user?.providerData])

	const photoUrl = useMemo(() => {
		return user?.providerData[0]?.photoURL || user?.photoURL
	}, [user?.photoURL, user?.providerData])

	return (
		<Wrapper>
			{provider === 'phone' ? (
				<>
					<PhoneIcon className="fa-solid fa-mobile-screen-button fa-beat" />
					<PhoneNumber>{user.providerData[0].phoneNumber}</PhoneNumber>
				</>
			) : (
				<>
					<Username>{user.displayName}</Username>
					<Avatar className="fa-beat" src={photoUrl} alt="pfp" />
				</>
			)}
			<div>
				<Button onClick={handleLogout}>Logout</Button>
			</div>
		</Wrapper>
	)
}

export default memo(UserProfile)
