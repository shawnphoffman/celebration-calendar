import { lazy, memo } from 'react'

import VendorProvider from 'context/VendorContext'

// import Agenda from 'components/v2/Agenda'

const VendorList = lazy(() => import('components/vendors/VendorList'))

const Vendors = () => {
	return (
		<VendorProvider>
			{/* <Filters /> */}
			<VendorList />
		</VendorProvider>
	)
}

export default memo(Vendors)
