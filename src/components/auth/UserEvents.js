import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
// import * as Panelbear from '@panelbear/panelbear-js'
import { ref, set } from 'firebase/database'
import { styled } from 'linaria/react'
import { v4 as uuidv4 } from 'uuid'

import Button from 'components/Button'
import EventListItem from 'components/events/EventListItem'

const Instructions = styled.div`
	margin: 8px 0px 16px 0px;
	font-size: 18px;
	font-weight: bold;
	color: #f00;
	text-align: center;
`

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`

const isValidHttpUrl = string => {
	let url

	try {
		url = new URL(string)
	} catch (_) {
		return false
	}

	return url.protocol === 'http:' || url.protocol === 'https:'
}

const Error = styled.div`
	background: #ffc6c4;
	padding: 16px;
	border-radius: 8px;
	margin-bottom: 8px;
	border: 2px solid #800000;
	color: #800000;
	font-weight: bold;
`

const InputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	margin-bottom: 8px;
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	background-color: var(--inputBg);
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
		border-color: var(--linkActive);
		box-shadow: 0 0 0 2px var(--inputBg);
		opacity: 1;
	}
`

const DateTimeInput = styled.input`
	margin: 0;
	padding: 8px;
	font-size: 16px;
	line-height: 1.2;
	text-align: start;
	text-indent: 0px;
	text-transform: none;
	word-spacing: 0px;
	border-color: var(--inputBorder);
	border-style: solid;
	border-width: 0;
	background-color: var(--transparent);
	opacity: 1;
	flex: 1;

	&:focus {
		outline-style: none;
		box-shadow: none;
		border-color: var(--transparent);
	}
`

const TextArea = styled.textarea`
	margin: 0;
	padding: 8px;
	font-size: 16px;
	line-height: 1.2;
	text-align: start;
	text-indent: 0px;
	text-transform: none;
	word-spacing: 0px;
	border-color: var(--inputBorder);
	border-style: solid;
	border-width: 0;
	background-color: var(--transparent);
	opacity: 1;
	flex: 1;

	&:focus {
		outline-style: none;
		box-shadow: none;
		border-color: var(--transparent);
	}

	width: 100%;
	height: 100px;
`

const TextInput = styled.input`
	margin: 0;
	padding: 8px;
	font-size: 16px;
	line-height: 1.2;
	text-align: start;
	text-indent: 0px;
	text-transform: none;
	word-spacing: 0px;
	border-color: var(--inputBorder);
	border-style: solid;
	border-width: 0;
	background-color: var(--transparent);
	opacity: 1;
	flex: 1;

	&:focus {
		outline-style: none;
		box-shadow: none;
		border-color: var(--transparent);
	}
`

const Label = styled.label`
	font-weight: bold;
	flex: 0;
	flex-wrap: nowrap;
	white-space: nowrap;
	margin-right: 8px;
	margin-top: 8px;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const UserEventForm = ({ user }) => {
	const formRef = useRef()
	const [error, setError] = useState()
	const [title, setTitle] = useState()
	const [description, setDescription] = useState()
	const [startTime, setStartTime] = useState()
	const [endTime, setEndTime] = useState()
	const [url, setUrl] = useState()
	const [address, setAddress] = useState()
	const [imageUrl, setImageUrl] = useState()

	// ============================================================
	const database = useDatabase()

	// User Events Ref
	const userEventsRef = useMemo(() => {
		return ref(database, `user-events/${user?.uid}`)
	}, [database, user])

	// User Events Resp
	const userEventsRep = useDatabaseObjectData(userEventsRef, {})

	// User Events
	const userEvents = useMemo(() => {
		if (userEventsRep?.status !== 'success' || !userEventsRep?.data) return null
		if (!userEventsRep?.data) {
			return null
		} else {
			return Object.values(userEventsRep.data).sort((a, b) => {
				const aStart = new Date(a.startDate)
				const bStart = new Date(b.startDate)
				const aEnd = new Date(a.endDate)
				const bEnd = new Date(b.endDate)

				if (aStart > bStart) return 1

				if (aStart < bStart) return -1

				if (aEnd > bEnd) return 1

				if (aEnd < bEnd) return -1

				if (a.summary > b.summary) return 1

				if (a.summary < b.summary) return -1

				return 0
			})
		}
	}, [userEventsRep?.data, userEventsRep?.status])

	// Add User Event
	const addUserEvent = useCallback(
		(id, event) => {
			const newEventRef = ref(database, `user-events/${user?.uid}/${id}`)
			set(newEventRef, event)
		},
		[database, user?.uid]
	)

	// ============================================================

	//
	const handleReset = useCallback(() => {
		setTitle(null)
		setDescription(null)
		setStartTime(null)
		setEndTime(null)
		setUrl(null)
		setAddress(null)
		setImageUrl(null)
		setError(null)
		formRef.current.reset()
	}, [])

	//
	const handleTitleChange = useCallback(e => {
		const value = e.target.value
		setTitle(value)
		if (!value) {
			setError('Missing title')
		} else {
			setError(null)
		}
	}, [])
	//
	const handleDescriptionChange = useCallback(e => {
		const value = e.target.value
		setDescription(value)
	}, [])
	//
	const handleStartChange = useCallback(e => {
		const value = e.target.value
		setStartTime(value)
		if (!value) {
			setError('Missing start time')
		} else {
			setError(null)
		}
	}, [])
	//
	const handleEndChange = useCallback(e => {
		const value = e.target.value
		setEndTime(value)
		if (!value) {
			setError('Missing end time')
		} else {
			setError(null)
		}
	}, [])
	//
	const handleUrlChange = useCallback(e => {
		const value = e.target.value

		if (!isValidHttpUrl(value)) {
			setError('Invalid event URL')
			return
		}
		setError(null)
		setUrl(value)
	}, [])
	//
	const handleAddressChange = useCallback(e => {
		const value = e.target.value
		setAddress(value)
	}, [])
	//
	const handleImageUrlChange = useCallback(e => {
		const value = e.target.value

		if (!isValidHttpUrl(value)) {
			setError('Invalid image URL')
			return
		}
		setError(null)
		setImageUrl(value)
	}, [])

	//
	const handleSubmit = useCallback(() => {
		if (error) {
			return
		}

		if (!title) {
			setError('Missing title')
			return
		}

		if (!startTime) {
			setError('Missing start time')
			return
		}

		if (!endTime) {
			setError('Missing end time')
			return
		}

		if (url && !isValidHttpUrl(url)) {
			setError('Invalid event URL')
			return
		}

		if (imageUrl && !isValidHttpUrl(imageUrl)) {
			setError('Invalid image URL')
			return
		}

		const newEvent = {
			id: uuidv4(),
			summary: title,
			description: description ?? null,
			venue: 'My Events',
			timezoneStartAt: 'America/Los_Angeles',
			startDate: startTime,
			endDate: endTime,
			startAt: new Date(startTime).toISOString(),
			endAt: new Date(endTime).toISOString(),
			color: 'var(--linkHover)',
			url: url ?? null,
			address: address ?? null,
			imageUrl: imageUrl ?? null,
			type: 'userEvent',
			private: true,
		}

		console.log({
			newEvent,
			title,
			description,
			startTime,
			endTime,
			url,
			address,
			imageUrl,
		})

		addUserEvent(newEvent.id, newEvent)
		handleReset()
	}, [addUserEvent, address, description, endTime, error, handleReset, imageUrl, startTime, title, url])

	return (
		<Wrapper>
			<Instructions>Custom events are private and not visible to other users.</Instructions>
			{error && <Error>{error}</Error>}
			{/*  */}
			<form ref={formRef}>
				<InputWrapper>
					<Label>Title*:</Label>
					<InputContainer>
						<TextInput type="text" placeholder="Event title" onChange={handleTitleChange} />
					</InputContainer>
				</InputWrapper>
				{/*  */}
				<InputWrapper>
					<Label>Description:</Label>
					<InputContainer>
						<TextArea type="text" placeholder="Event description" onChange={handleDescriptionChange} />
					</InputContainer>
				</InputWrapper>
				{/*  */}
				<InputWrapper>
					<Label>Start Time*:</Label>
					<InputContainer>
						<DateTimeInput type="datetime-local" min="2022-05-23T12:00" max="2022-05-31T12:00" step="300" onChange={handleStartChange} />
					</InputContainer>
				</InputWrapper>
				{/*  */}
				<InputWrapper>
					<Label>End Time*:</Label>
					<InputContainer>
						<DateTimeInput type="datetime-local" min="2022-05-23T12:00" max="2022-05-31T12:00" step="300" onChange={handleEndChange} />
					</InputContainer>
				</InputWrapper>
				{/*  */}
				<InputWrapper>
					<Label>URL:</Label>
					<InputContainer>
						<TextInput type="text" placeholder="URL with event info (e.g. https://starwars.com)" onChange={handleUrlChange} />
					</InputContainer>
				</InputWrapper>
				{/*  */}
				<InputWrapper>
					<Label>Physical Address:</Label>
					<InputContainer>
						<TextArea type="textarea" placeholder="Address of the venue" onChange={handleAddressChange} />
					</InputContainer>
				</InputWrapper>
				{/*  */}
				<InputWrapper>
					<Label>Image URL:</Label>
					<InputContainer>
						<TextInput
							type="text"
							placeholder="Image URL to display (e.g. https://starwars.com/cool.png)"
							onChange={handleImageUrlChange}
						/>
					</InputContainer>
				</InputWrapper>
			</form>
			<ButtonWrapper>
				<Button as="button" disabled={!!error} onClick={handleSubmit}>
					Save Event
				</Button>
				<Button as="button" onClick={handleReset}>
					Clear Form
				</Button>
			</ButtonWrapper>
			{/*  */}
			{/*  */}
			<div>{userEvents && Object.values(userEvents).map(e => <EventListItem event={e} key={e.id} forceOpen />)}</div>
		</Wrapper>
	)
}

export default memo(UserEventForm)
