import { memo, useCallback } from 'react'
import { useAuth } from 'reactfire'
import { styled } from 'linaria/react'

import Button from 'components/Button'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Username = styled.div`
	font-size: 32px;
	font-weight: bold;
	margin-top: 16px;
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
		auth.signOut().then(() => console.log('signed out'))
	}, [auth])

	console.log({ user })

	return (
		<Wrapper>
			<Username>{user.displayName}</Username>
			<Avatar src={user.photoURL} alt="pfp" />
			{/* <div>
				{user.providerData?.map(profile => (
					<div key={profile?.providerId}>{profile?.providerId}</div>
				))}
			</div> */}
			<div>
				<Button onClick={handleLogout}>Logout</Button>
			</div>
		</Wrapper>
	)
}

export default memo(UserProfile)
