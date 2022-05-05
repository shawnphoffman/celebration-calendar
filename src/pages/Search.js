import { memo, useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import Fuse from 'fuse.js'
import { styled } from 'linaria/react'

import EventDetails from 'components/EventDetails'
import { Wrapper } from 'components/styles'
import { useEventContext } from 'context/EventContext'

const InputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	background-color: #fff;
	border-color: none;
	border-width: 1px;
	border-style: solid;
	transition-delay: 0s;
	transition-duration: 0.2s;
	transition-property: box-shadow;
	transition-timing-function: ease-in-out;
	border-radius: 8px;
	user-select: none;
	margin-bottom: 16px;
	max-width: 1200px;
	width: 100%;

	&:hover {
		opacity: 0.8;
	}

	&:focus-within {
		border-color: #3e498c;
		box-shadow: 0 0 0 2px white;
		opacity: 1;
	}
`

const Input = styled.input`
	margin: 0;
	padding: 16px;
	font-size: 16px;
	line-height: 24px;
	text-align: start;
	text-indent: 0px;
	text-transform: none;
	word-spacing: 0px;
	border-color: black;
	border-style: solid;
	border-width: 0;
	background-color: #0000;
	opacity: 1;
	flex: 1;

	&:focus {
		outline-style: none;
		box-shadow: none;
		border-color: #0000;
	}
`

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

const Search = () => {
	const { events } = useEventContext()
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])
	const [, startTransition] = useTransition()
	// const deferredSearch = useDeferredValue(search);

	const fuse = useMemo(() => {
		return new Fuse(events, options)
	}, [events])

	useEffect(() => {
		// const output = fuse.search(deferredSearch, { limit: 20 })
		const output = fuse.search(search, { limit: 20 })
		startTransition(() => setResults(output))
		// setResults(output)
		// }, [fuse, deferredSearch])
	}, [fuse, search])

	const handleChange = useCallback(e => {
		const value = e.target.value
		setSearch(value)
	}, [])

	return (
		<Wrapper>
			<InputWrapper>
				<Input onChange={handleChange} type="text" placeholder="Search panels..." />
			</InputWrapper>
			{results.map(r => (
				<EventDetails event={r.item} key={r.item.id} />
			))}
		</Wrapper>
	)
}

export default memo(Search)