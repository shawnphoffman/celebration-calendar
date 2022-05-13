// import { memo, useCallback, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useDatabase, useDatabaseListData, useDatabaseObjectData, useUser } from 'reactfire'
// import { equalTo, orderByValue, query, ref, set } from 'firebase/database'
// import { styled } from 'linaria/react'
import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDatabase, useDatabaseListData } from 'reactfire'
import { ref } from 'firebase/database'
import { styled } from 'linaria/react'

// import Button from 'components/Button'
import { NonScrollWrapper } from 'components/styles'
import { useEventContext } from 'context/EventContext'

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	font-size: 18px;
	font-weight: bold;
	padding: 6px;
`
const Lunk = styled(Link)`
	color: var(--link);
	text-decoration: none;
	&:hover {
		color: var(--linkHover);
	}
`

// const Divider = styled.hr`
// 	width: 100%;
// 	border-color: red;
// `

// const events = ['event1', 'event2', 'event3', 'event4', 'event5']
// const users = ['user1', 'user2', 'user3', 'user4']

const Temp = () => {
	// const { data: user } = useUser()

	// const [user, setUser] = useState(users[0])
	const [{ allEvents }] = useEventContext()

	const database = useDatabase()

	// ============================================================

	// User Favorites Query
	// const userFavQ = useMemo(() => {
	// 	const userFavRef = ref(database, `user-favorites/${user?.uid}`)
	// 	const userFavQuery = query(userFavRef, orderByValue())
	// 	return query(userFavQuery, equalTo('true'))
	// }, [database, user])

	// User Favorites Resp
	// const userFavResp = useDatabaseObjectData(userFavQ, {})

	// User Favorite
	// const userFaves = useMemo(() => {
	// 	if (userFavResp?.status !== 'success' || !userFavResp?.data) return []
	// 	return Object.keys(userFavResp?.data) || []
	// }, [userFavResp?.data, userFavResp?.status])

	// ============================================================

	// Add/Remove User Favorite
	// const toggleFavorite = useCallback(
	// 	(id, newState) => {
	// 		const userFavRef = ref(database, `user-favorites/${user?.uid}/${id}`)
	// 		// set(userFavRef, `${newState}`)
	// 		set(userFavRef, newState ? 'true' : null)
	// 		// console.log('SET', { id, newState })
	// 	},
	// 	[database, user]
	// )

	// ============================================================

	// All Favorites Resp
	const allFavRef = ref(database, `user-favorites`)
	const allFavResp = useDatabaseListData(allFavRef, {
		idField: 'id',
	})
	// All Favorites Count
	const allFaves = useMemo(() => {
		if (allFavResp?.status !== 'success' || !allFavResp?.data) return []
		return allFavResp.data.reduce((memo, user) => {
			// console.log('USER', { user })
			Object.keys(user).forEach(key => {
				if (user[key] === 'true') {
					memo[key] = Number(memo[key] ?? null) + 1
				}
			})
			return memo
		}, {})
	}, [allFavResp?.data, allFavResp?.status])

	// ============================================================

	// HELPERS
	// const log = useCallback(() => {
	// 	console.log('allFavResp.data', allFavResp)
	// }, [allFavResp])

	return (
		<NonScrollWrapper>
			{Object.keys(allFaves).map(e => {
				const count = allFaves[e] ?? 0
				return (
					<Row key={e}>
						<Lunk to={`/event/${e}`}>{`${count} - [${e}] ${allEvents?.find(x => x.id === e).summary}`}</Lunk>
					</Row>
				)
			})}
			{/*  */}
			{/* <Row>
				{users.map(u => (
					<Button key={u} onClick={() => setUser(u)}>
						{u === user && '### '}
						{u}
						{u === user && ' ###'}
					</Button>
				))}
			</Row> */}
			{/*  */}
			{/* <Divider /> */}
			{/*  */}
			{/* <Row>
				{Object.keys(allFaves).map(e => {
					const isFavorited = userFaves.includes(e)
					const count = allFaves[e] ?? 0
					return <Button key={e}>{`${e} (${count})`}</Button>
				})}
			</Row> */}
			{/*  */}
			{/* <Divider /> */}
			{/*  */}
			{/* <Button onClick={log}>Print Log</Button> */}
			{/* <div> */}
			{/* <pre>{JSON.stringify(allFavResp.data, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(allFaves, null, 2)}</pre> */}
			{/* </div> */}
		</NonScrollWrapper>
	)
}

export default memo(Temp)

/*
DUMP

	// Basic User Favorite Query
	const userFavRef = ref(database, `temp-favorites/user1`)
	// const userFavQuery = query(userFavRef)
	// const userFavQuery = query(userFavRef, Fire.orderByValue())
	const userFavResp = useDatabaseObjectData(userFavRef, {
		// idField: 'id',
	})
	// const userFavResp = useDatabaseListData(userFavQuery, {
	// 	idField: 'id',
	// })

*/

/*

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return update(ref(db), updates);

	*/

/*
	function toggleStar(uid) {
  const db = getDatabase();
  const postRef = ref(db, '/posts/foo-bar-123');

  runTransaction(postRef, (post) => {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}
*/
