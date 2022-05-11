import React, { createContext, memo, useContext } from 'react'

import { useDeviceTheme } from 'hooks/useDeviceTheme'

const ThemeContext = createContext('light')

const ThemeProvider = ({ children }) => {
	const theme = useDeviceTheme()
	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)

export default memo(ThemeProvider)
