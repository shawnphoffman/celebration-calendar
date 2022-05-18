import { memo, Suspense, useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import Fuse from 'fuse.js'
import { styled } from 'linaria/react'

import Loading from 'components/Loading'
import { Input, InputWrapper, PageTitle } from 'components/styles'
import { useFavoriteVendorsContext } from 'context/FavoriteVendorsContext'
import { useVendorContext } from 'context/VendorContext'

import VendorListItem from './VendorListItem'

// const FilterName = styled.span``

const Filter = styled.div`
	flex: 0 1;
	display: flex;
	flex-direction: row;
	margin: 0px 16px 16px 16px;
	padding: 12px;
	border: 1px solid var(--text);
	border-radius: 8px;
	font-size: 16px;
	line-height: 24px;
	box-sizing: border-box;
	justify-content: center;
	align-items: center;
	font-size: 24px;

	&:hover {
		color: var(--inputBg);
		background: var(--linkActive);
	}

	color: ${p => (p.active ? 'var(--linkActive)' : 'var(--text)')};
	border-color: ${p => (p.active ? 'var(--linkActive)' : 'var(--text)')};

	text-decoration: none;
	cursor: pointer;
`

const Controls = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;
`

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
	const [bookmarksOnly, setBookmarksOnly] = useState(false)
	const { favorites } = useFavoriteVendorsContext()

	const startSet = useMemo(() => {
		if (bookmarksOnly) {
			return state?.allVendors.filter(v => favorites.includes(v.id))
		}
		return state.allVendors
	}, [bookmarksOnly, favorites, state.allVendors])

	const fuse = useMemo(() => {
		return new Fuse(startSet, options)
	}, [startSet])

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

	const toggleBookmarksOnly = useCallback(() => {
		startTransition(() => setBookmarksOnly(!bookmarksOnly))
	}, [bookmarksOnly])

	if (!state || state?.allVendors.length === 0) {
		return <Loading />
	}

	return (
		<Container>
			<PageTitle>
				Search Vendors
				{isPending && <Loading inline />}
			</PageTitle>
			<Controls>
				<InputWrapper>
					<Input onChange={handleChange} type="text" placeholder="Search vendors..." />
				</InputWrapper>
				<Filter onClick={toggleBookmarksOnly} active={bookmarksOnly}>
					<i className="fa-solid fa-bookmark" />
				</Filter>
			</Controls>
			<ScrollBox>
				<Suspense fallback={<Loading />}>
					{(!search || search.length < 3) && startSet.map(v => <VendorListItem key={v.id} vendor={v} />)}
					{results.map(r => {
						return <VendorListItem key={r.item.id} vendor={r.item} />
					})}
				</Suspense>
			</ScrollBox>
		</Container>
	)
}

export default memo(VendorList)
