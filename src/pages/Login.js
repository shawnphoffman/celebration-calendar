import { memo, useCallback } from 'react'
import { useAuth, useSigninCheck, useUser } from 'reactfire'
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, TwitterAuthProvider } from 'firebase/auth'

import UserProfile from 'components/auth/UserProfile'
import Button from 'components/Button'
import Loading from 'components/Loading'

const signInTwitter = async auth => {
	const provider = new TwitterAuthProvider()
	await signInWithPopup(auth, provider)
}

const signInPhone = async auth => {
	const appVerifier = new RecaptchaVerifier(
		'recaptcha-container',
		{
			callback: response => {
				console.log({ response })
				signInWithPhoneNumber(auth, '+13176040325', appVerifier)
					.then(confirmationResult => {
						console.log({ confirmationResult })
						debugger
						confirmationResult
							.confirm('123456')
							.then(result => {
								// User signed in successfully.
								console.log({ result })
								const user = result.user
								debugger
								// ...
							})
							.catch(error => {
								console.log({ error })
								debugger
								// User couldn't sign in (bad verification code?)
								// ...
							})
					})
					.catch(e => {
						console.log({ e })
						debugger
					})
			},
		},
		auth
	)

	// const widgetId = await appVerifier.render()
	// window.recaptchaWidgetId = widgetId
}

const Login = () => {
	const { status, data: signInCheckResult } = useSigninCheck()
	const auth = useAuth()
	const { data: user } = useUser()

	const handlePhone = useCallback(async () => {
		await signInPhone(auth)
	}, [auth])

	if (status === 'loading') {
		return <Loading />
	}

	const { signedIn } = signInCheckResult

	if (signedIn === true) {
		return (
			<UserProfile user={user} />
			// linkWithCredential
		)
	} else {
		return (
			<div>
				<Button onClick={() => signInTwitter(auth)}>
					Login with Twitter&nbsp;
					<i className="fa-brands fa-twitter"></i>
				</Button>
				{process.env.NODE_ENV === 'development' && (
					<Button onClick={handlePhone}>
						Login with Phone&nbsp;
						<i className="fa-solid fa-mobile-screen-button"></i>
					</Button>
				)}
				<div id="recaptcha-container"></div>
			</div>
		)
	}
}

export default memo(Login)
