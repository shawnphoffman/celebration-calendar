import { lazy, memo } from 'react'

import FavoriteVendorsProvider from 'context/FavoriteVendorsContext'
import VendorProvider from 'context/VendorContext'

// import Agenda from 'components/v2/Agenda'

const VendorList = lazy(() => import('components/vendors/VendorList'))

const Vendors = () => {
	return (
		<VendorProvider>
			<FavoriteVendorsProvider>
				<VendorList />
			</FavoriteVendorsProvider>
		</VendorProvider>
	)
}

export default memo(Vendors)
