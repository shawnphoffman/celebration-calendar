import { useCallback, useEffect, useRef, useState } from 'react'

export const useDeviceTheme = () => {
	const mediaQuery = useRef(window?.matchMedia('(prefers-color-scheme: dark)'))

	const [deviceTheme, setDeviceTheme] = useState(mediaQuery.current?.matches ? 'dark' : 'light')

	const mediaListenerHandler = useCallback(matches => (matches ? setDeviceTheme('dark') : setDeviceTheme('light')), [setDeviceTheme])

	useEffect(() => {
		const rootBgColor = deviceTheme === 'dark' ? '#111' : '#eee'
		document.documentElement.setAttribute('style', `background: ${rootBgColor}`)
	}, [deviceTheme])

	useEffect(() => {
		const listener = ({ matches }) => mediaListenerHandler(matches)

		const currentMediaQuery = mediaQuery.current
		currentMediaQuery?.addEventListener('change', listener)

		return () => {
			currentMediaQuery?.removeEventListener('change', listener)
		}
	}, [mediaListenerHandler])

	return deviceTheme
}
