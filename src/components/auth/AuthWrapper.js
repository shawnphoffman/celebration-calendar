import { useSigninCheck } from 'reactfire'

import Loading from 'components/Loading'

export const AuthWrapper = ({ children, fallback }) => {
	const { status, data: signInCheckResult } = useSigninCheck()

	if (!children) {
		throw new Error('Children must be provided')
	}
	if (status === 'loading') {
		return <Loading />
	} else if (signInCheckResult.signedIn === true) {
		return children
	}

	return fallback
}
