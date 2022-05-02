import { memo, useMemo } from 'react'

import rawEvents from 'data/schedule.json'

import { processEvents } from 'utils/eventUtils'

const Test = () => {
	const events = useMemo(() => {
		return processEvents(rawEvents)
	}, [])

	return (
		<>
			<h2>Raw</h2>
			<pre>{JSON.stringify(events, null, 2)}</pre>
		</>
	)
}

export default memo(Test)
