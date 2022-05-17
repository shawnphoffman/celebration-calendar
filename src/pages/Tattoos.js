import { lazy, memo } from 'react'

import VendorProvider from 'context/VendorContext'

const TattooList = lazy(() => import('components/vendors/TattooList'))

const Tattoos = () => {
	return (
		<VendorProvider>
			<TattooList />
		</VendorProvider>
	)
}

export default memo(Tattoos)
