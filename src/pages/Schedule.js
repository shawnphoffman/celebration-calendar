import { lazy, memo } from 'react'

import Agenda from 'components/events/Agenda'

const Filters = lazy(() => import('components/events/Filters'))

const Schedule = () => {
	return (
		<>
			<Filters />
			<Agenda />
		</>
	)
}

export default memo(Schedule)
