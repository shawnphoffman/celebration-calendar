import { memo, Suspense } from 'react'
import { AppCheckProvider, AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { styled } from 'linaria/react'

import Loading from 'components/Loading'
import Nav from 'components/Nav'
import EventProvider from 'context/EventContext'
import FavoritesProvider from 'context/FavoritesContext'
import ThemeProvider from 'context/ThemeContext'
import { useDeviceTheme } from 'hooks/useDeviceTheme'
import themeConditional from 'hooks/useThemeConditional'

import AppRoutes from './AppRoutes'

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	height: ${() => window.innerHeight}px;
	align-items: center;
	padding: 0 8px 8px 8px;
	background: var(--bg);
`

const APP_CHECK_TOKEN = process.env.REACT_APP_RECAPTCHA_SITE_KEY

function App() {
	// Firebase
	const firebaseApp = useFirebaseApp('wow')
	const appCheck = initializeAppCheck(firebaseApp, {
		provider: new ReCaptchaV3Provider(APP_CHECK_TOKEN),
		isTokenAutoRefreshEnabled: true,
	})
	const auth = getAuth(firebaseApp)
	const database = getDatabase(firebaseApp)
	// Theme
	const theme = useDeviceTheme()
	const themeClass = themeConditional(theme)

	return (
		<ThemeProvider>
			<AppWrapper className={themeClass}>
				<Suspense fallback={<Loading />}>
					<AppCheckProvider sdk={appCheck}>
						<AuthProvider sdk={auth}>
							<Nav />
							<DatabaseProvider sdk={database}>
								<EventProvider>
									<FavoritesProvider>
										<AppRoutes />
									</FavoritesProvider>
								</EventProvider>
							</DatabaseProvider>
						</AuthProvider>
					</AppCheckProvider>
				</Suspense>
			</AppWrapper>
		</ThemeProvider>
	)
}

export default memo(App)
