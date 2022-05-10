import 'firebase/database'

import { memo } from 'react'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { increment, ref, set } from 'firebase/database'

import { AuthWrapper } from 'components/auth/AuthWrapper'
import NonAuthBlocked from 'components/auth/NonAuthBlocked'
import Loading from 'components/Loading'
import { Header, Wrapper } from 'components/styles'

// import { AuthWrapper } from ''

const Counter = () => {
	const database = useDatabase()
	const counterRef = ref(database, 'counter')
	const adjustCount = amount => {
		return set(counterRef, increment(amount))
	}

	const response = useDatabaseObjectData(counterRef)

	const { status, data: count } = response
	if (status === 'loading') {
		return <Loading />
	}

	return (
		<>
			<button onClick={() => adjustCount(-1)}>-</button>
			<span> {count} </span>
			<button onClick={() => adjustCount(1)}>+</button>
		</>
	)
}

const Data = () => {
	return (
		<Wrapper>
			<AuthWrapper fallback={<NonAuthBlocked />}>
				<Header>Realtime Database</Header>
				<Counter />
			</AuthWrapper>
		</Wrapper>
	)
}

export default memo(Data)
