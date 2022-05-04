import { lazy, memo, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Resources from 'pages/Resources'
import Search from 'pages/Search'
import Todo from 'pages/Todo'

import EventProvider from 'context/EventContext'

// import Schedule from './pages/Schedule'
const Schedule = lazy(() => import('./pages/Schedule'))

function App() {
	return (
		<div className="wrapper">
			<Suspense fallback={<header>Loading...</header>}>
				<header>Celebration Calendar</header>
				<EventProvider>
					<Routes>
						<Route path="todo" element={<Todo />} />
						<Route path="resources" element={<Resources />} />
						<Route path="search" element={<Search />} />
						<Route path="*" element={<Schedule />} />
					</Routes>
				</EventProvider>
			</Suspense>
		</div>
	)
}

export default memo(App)
