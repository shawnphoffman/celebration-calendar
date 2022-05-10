import { memo, Suspense } from 'react'
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { styled } from 'linaria/react'

import AppRoutes from 'components/AppRoutes'
import Loading from 'components/Loading'
import Nav from 'components/Nav'
import EventProvider from 'context/EventContext'
import FavoritesProvider from 'context/FavoritesContext'

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	align-items: center;
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 0;
`

function App() {
	// Firebase
	const firebaseApp = useFirebaseApp()
	const auth = getAuth(firebaseApp)
	const database = getDatabase(firebaseApp)
	return (
		<AppWrapper>
			<Suspense fallback={<Loading />}>
				<AuthProvider sdk={auth}>
					<DatabaseProvider sdk={database}>
						<Header>
							<Nav />
						</Header>
						<EventProvider>
							<FavoritesProvider>
								<AppRoutes />
							</FavoritesProvider>
						</EventProvider>
					</DatabaseProvider>
				</AuthProvider>
			</Suspense>
		</AppWrapper>
	)
}

export default memo(App)
