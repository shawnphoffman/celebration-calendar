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
import ThemeProvider from 'context/ThemeContext'
import { useDeviceTheme } from 'hooks/useDeviceTheme'
import themeConditional from 'hooks/useThemeConditional'

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	align-items: center;
	padding: 0 8px 8px 8px;
	background: var(--bg);
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
	// Theme
	const theme = useDeviceTheme()
	const themeClass = themeConditional(theme)

	return (
		<ThemeProvider>
			<AppWrapper className={themeClass}>
				<Suspense fallback={<Loading />}>
					<AuthProvider sdk={auth}>
						<Header>
							<Nav />
						</Header>
						<DatabaseProvider sdk={database}>
							<EventProvider>
								<FavoritesProvider>
									<AppRoutes />
								</FavoritesProvider>
							</EventProvider>
						</DatabaseProvider>
					</AuthProvider>
				</Suspense>
			</AppWrapper>
		</ThemeProvider>
	)
}

export default memo(App)
