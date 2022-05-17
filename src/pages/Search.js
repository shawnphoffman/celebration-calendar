import { memo, useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import Fuse from 'fuse.js'
import { styled } from 'linaria/react'

import EventListItem from 'components/events/EventListItem'
import { Input, InputWrapper } from 'components/styles'
import { useEventContext } from 'context/EventContext'

const options = {
	includeScore: true,
	shouldSort: true,
	minMatchCharLength: 3,
	threshold: 0.6,
	keys: [
		{
			name: 'summary',
			weight: 0.7,
		},
		{
			name: 'description',
			weight: 0.3,
		},
	],
}
const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	overflow-x: hidden;
	background: var(--bg);
	border-radius: 8px;
	flex-direction: column;
	align-items: center;
`
const ScrollBox = styled.div`
	width: 100%;
	overflow-y: scroll;
	::-webkit-scrollbar-corner {
		background: var(--transparent);
	}
`

const Search = () => {
	const [state] = useEventContext()
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])
	const [, startTransition] = useTransition()

	const fuse = useMemo(() => {
		return new Fuse(state.allEvents, options)
	}, [state.allEvents])

	useEffect(() => {
		if (search.length >= 3) {
			const output = fuse.search(search, { limit: 20 })
			startTransition(() => setResults(output))
		} else if (search.length === 0) {
			setResults([])
		}
	}, [fuse, search])

	const handleChange = useCallback(e => {
		const value = e.target.value
		startTransition(() => setSearch(value))
	}, [])

	return (
		<Container>
			<InputWrapper>
				<Input onChange={handleChange} type="text" placeholder="Search panels..." />
			</InputWrapper>
			<ScrollBox>
				{results.map(r => (
					<EventListItem event={r.item} key={r.item.id} forceOpen />
				))}
			</ScrollBox>
		</Container>
	)
}

export default memo(Search)
