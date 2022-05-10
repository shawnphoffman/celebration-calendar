import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'
import * as Panelbear from '@panelbear/panelbear-js'

import { firebaseConfig } from 'config/firebaseConfig'
import Event from 'utils/events'

import App from './App'
import reportWebVitals from './reportWebVitals'

// Analytics
if (process.env.REACT_APP_PANELBEAR_SITE_ID) {
	Panelbear.load(process.env.REACT_APP_PANELBEAR_SITE_ID)
	Panelbear.trackPageview()
	Panelbear.track(Event.PageLoad)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<HashRouter>
				<App />
			</HashRouter>
		</FirebaseAppProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
