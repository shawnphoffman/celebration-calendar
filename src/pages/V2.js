import { lazy, memo } from 'react'

import Agenda from 'components/v2/Agenda'

const Filters = lazy(() => import('components/Filters'))

const Schedule = () => {
	return (
		<>
			<Filters />
			<Agenda />
		</>
	)
}

export default memo(Schedule)
