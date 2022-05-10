import { memo } from 'react'
import { useAuth, useSigninCheck, useUser } from 'reactfire'
import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth'

import UserProfile from 'components/auth/UserProfile'
import Button from 'components/Button'
import Loading from 'components/Loading'

const signIn = async auth => {
	const provider = new TwitterAuthProvider()
	await signInWithPopup(auth, provider)
}

const Login = () => {
	const { status, data: signInCheckResult } = useSigninCheck()
	const auth = useAuth()
	const { data } = useUser()

	if (status === 'loading') {
		return <Loading />
	}

	const { signedIn } = signInCheckResult

	if (signedIn === true) {
		return <UserProfile user={data} />
	} else {
		return (
			<div>
				<Button onClick={() => signIn(auth)}>
					Login with Twitter&nbsp;
					<i className="fa-brands fa-twitter"></i>
				</Button>
			</div>
		)
	}
}

export default memo(Login)
