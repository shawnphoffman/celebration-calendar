import { memo } from 'react'
// import { NavLink, Route, Routes } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
// import { styled } from 'linaria/react'
import Test from 'pages/Test'

import EventProvider from 'context/EventContext'

import Schedule from './pages/Schedule'

// const NavBar = styled.div`
// 	background: #fff;
// 	margin: 0px 16px 8px 16px;
// 	border-radius: 8px;
// 	padding: 8px 16px;
// 	display: flex;
// 	flex-direction: row;
// 	align-items: center;
// 	font-size: 12px;
// 	font-weight: bold;
// `

// const Link = styled(NavLink)`
// 	margin: 0px 8px;
// `

// const Nav = memo(() => {
// 	return (
// 		<NavBar>
// 			<Link to="/">Home</Link>
// 			<Link to="test">Test</Link>
// 		</NavBar>
// 	)
// })

function App() {
	return (
		<EventProvider>
			<div className="wrapper">
				<header>Celebration Calendar</header>
				{/* <Nav /> */}
				<Routes>
					<Route path="test" element={<Test />} />
					<Route path="*" element={<Schedule />} />
				</Routes>
			</div>
		</EventProvider>
	)
}

export default memo(App)
