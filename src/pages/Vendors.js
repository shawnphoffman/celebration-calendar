import { lazy, memo } from 'react'

import VendorProvider from 'context/VendorContext'

// import Agenda from 'components/v2/Agenda'

// const Filters = lazy(() => import('components/Filters'))

const Vendors = () => {
	return (
		<VendorProvider>
			{/* <Filters /> */}
			{/* <Agenda /> */}
		</VendorProvider>
	)
}

export default memo(Vendors)
