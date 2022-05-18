import { memo, Suspense, useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import Fuse from 'fuse.js'
import { styled } from 'linaria/react'

import Loading from 'components/Loading'
import { Input, InputWrapper, PageTitle } from 'components/styles'
import { useVendorContext } from 'context/VendorContext'

import VendorListItem from './VendorListItem'

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

const options = {
	includeScore: true,
	shouldSort: true,
	minMatchCharLength: 3,
	threshold: 0.6,
	keys: [
		{
			name: 'company',
			weight: 0.7,
		},
		{
			name: 'description',
			weight: 0.3,
		},
	],
}

const VendorList = () => {
	const [state] = useVendorContext()
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])
	const [isPending, startTransition] = useTransition()

	const fuse = useMemo(() => {
		return new Fuse(state.allVendors, options)
	}, [state.allVendors])

	useEffect(() => {
		if (search.length >= 3) {
			const output = fuse.search(search, { limit: 20 })
			startTransition(() => setResults(output))
		}
	}, [fuse, search])

	const handleChange = useCallback(e => {
		const value = e.target.value
		startTransition(() => setSearch(value))
	}, [])

	if (!state || state?.allVendors.length === 0) {
		return <Loading />
	}

	return (
		<Container>
			<PageTitle>
				Search Vendors
				{isPending && <Loading inline />}
			</PageTitle>
			<InputWrapper>
				<Input onChange={handleChange} type="text" placeholder="Search vendors..." />
			</InputWrapper>
			<ScrollBox>
				<Suspense fallback={<Loading />}>
					{(!search || search.length < 3) && state.allVendors.map(v => <VendorListItem key={v.id} vendor={v} />)}
					{results.map(r => {
						return <VendorListItem key={r.item.id} vendor={r.item} />
					})}
				</Suspense>
			</ScrollBox>
		</Container>
	)
}

export default memo(VendorList)
