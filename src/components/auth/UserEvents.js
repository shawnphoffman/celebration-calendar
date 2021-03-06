import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import * as Panelbear from '@panelbear/panelbear-js'
import { ref, set } from 'firebase/database'
import { styled } from 'linaria/react'
import { v4 as uuidv4 } from 'uuid'

import Button from 'components/Button'
import EventListItem from 'components/events/EventListItem'
import Event from 'utils/events'

const isValidHttpUrl = string => {
	let url
	try {
		url = new URL(string)
	} catch (_) {
		return false
	}
	return url.protocol === 'http:' || url.protocol === 'https:'
}
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
	&:disabled {
		background: #d3d3d3;
		border-radius: 8px;
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
const CheckboxWrapper = styled(InputWrapper)`
	align-items: center;
	margin-bottom: 16px;
	height: 40px;
`
const CheckboxLabel = styled(Label)`
	margin-top: 0;
`
const Checkbox = styled.input`
	height: 24px;
	width: 24px;
	margin-right: 4px;
`
const CheckHint = styled.span`
	color: var(--linkHover);
`

const UserEventForm = ({ user }) => {
	const [error, setError] = useState('')
	const [id, setId] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [venue, setVenue] = useState('My Events')
	const [startTime, setStartTime] = useState(new Date().toISOString().substring(0, 16))
	const [endTime, setEndTime] = useState(new Date().toISOString().substring(0, 16))
	const [url, setUrl] = useState('')
	const [address, setAddress] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [isPrivate, setIsPrivate] = useState(true)

	// ============================================================
	const database = useDatabase()

	// User Events Ref
	const userEventsRef = useMemo(() => {
		return ref(database, `user-events/${user?.uid}`)
	}, [database, user])
	const customEventsRef = useMemo(() => {
		return ref(database, `custom-events/${user?.uid}`)
	}, [database, user])

	// User Events Resp
	const userEventsRep = useDatabaseObjectData(userEventsRef, {})
	const customEventsRep = useDatabaseObjectData(customEventsRef, {})

	// User Events
	const userEvents = useMemo(() => {
		if (userEventsRep?.status !== 'success' || !userEventsRep?.data || customEventsRep?.status !== 'success' || !customEventsRep?.data)
			return null
		if (!userEventsRep?.data && !customEventsRep?.data) {
			return null
		} else {
			// const customEvents = Object.keys(customEventsRep.data).reduce((memo, curr) => {

			// 	return memo
			// }, [])
			const temp = [...Object.values(userEventsRep.data), ...Object.values(customEventsRep.data)]

			// console.log({
			// 	user: userEventsRep.data,
			// 	custom: customEventsRep.data,
			// })

			return temp.sort((a, b) => {
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
	}, [customEventsRep.data, customEventsRep?.status, userEventsRep.data, userEventsRep?.status])

	// Add User Event
	const addUserEvent = useCallback(
		event => {
			// Existing event. Delete the old
			if (event.id) {
				if (event.private) {
					// Delete public event
					const publicEventRef = ref(database, `custom-events/${user?.uid}/${event.id}`)
					set(publicEventRef, null)
				} else {
					// Delete private event
					const privateEventRef = ref(database, `user-events/${user?.uid}/${event.id}`)
					set(privateEventRef, null)
				}
			} else {
				event.id = uuidv4()
			}

			if (event.private) {
				const eventRef = ref(database, `user-events/${user?.uid}/${event.id}`)
				set(eventRef, event)
			} else {
				const eventRef = ref(database, `custom-events/${user?.uid}/${event.id}`)
				set(eventRef, event)
			}
		},
		[database, user?.uid]
	)

	// ============================================================

	//
	const handleReset = useCallback(() => {
		setId('')
		setTitle('')
		setDescription('')
		setVenue('My Events')
		setStartTime(new Date().toISOString().substring(0, 16))
		setEndTime(new Date().toISOString().substring(0, 16))
		setUrl('')
		setAddress('')
		setImageUrl('')
		setIsPrivate(true)
		setError('')
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
	const handleVenueChange = useCallback(e => {
		const value = e.target.value
		setVenue(value)
		if (!value) {
			setError('Missing venue')
		} else {
			setError(null)
		}
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
	const handlePrivateChange = useCallback(e => {
		const value = e.target.checked
		setIsPrivate(value)
	}, [])

	useEffect(() => {
		if (!isPrivate) {
			setVenue('Public Events')
		} else {
			setVenue('My Events')
		}
	}, [isPrivate])

	//
	const handleSubmit = useCallback(() => {
		if (error) {
			return
		}

		if (!title) {
			setError('Missing title')
			return
		}

		if (!venue) {
			setError('Missing venue')
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
			id: id,
			summary: title,
			description: description ?? null,
			venue: venue,
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
			private: isPrivate,
			creator: user?.uid,
		}

		addUserEvent(newEvent)
		handleReset()

		Panelbear.track(Event.AddOrEditCustomEvent)
	}, [addUserEvent, address, description, endTime, error, handleReset, id, imageUrl, isPrivate, startTime, title, url, user?.uid, venue])

	const handleEdit = useCallback(event => {
		setId(event.id)
		setTitle(event.summary)
		setDescription(event.description)
		setVenue(event.venue)
		setStartTime(event.startDate)
		setEndTime(event.endDate)
		setUrl(event.url)
		setAddress(event.address)
		setImageUrl(event.imageUrl)
		setIsPrivate(event.private)
		Panelbear.track(Event.EditCustomEvent)
	}, [])

	return (
		<Wrapper>
			<Instructions>Custom events are private and not visible to other users.</Instructions>
			{error && <Error>{error}</Error>}
			{/*  */}
			{process.env.NODE_ENV === 'development' && (
				<InputWrapper>
					<Label>ID:</Label>
					<InputContainer>
						<TextInput type="text" readOnly disabled value={id} />
					</InputContainer>
				</InputWrapper>
			)}
			<InputWrapper>
				<Label>Title*:</Label>
				<InputContainer>
					<TextInput type="text" placeholder="Event title" onChange={handleTitleChange} value={title} />
				</InputContainer>
			</InputWrapper>
			{/*  */}
			<CheckboxWrapper>
				<CheckboxLabel>Is this event only for you?:</CheckboxLabel>
				<Checkbox type="checkbox" onChange={handlePrivateChange} checked={isPrivate} />
				<CheckHint>{isPrivate ? 'Yes, this is private' : 'No, I want this to be public'}</CheckHint>
			</CheckboxWrapper>
			{/*  */}
			<InputWrapper>
				<Label>Description:</Label>
				<InputContainer>
					<TextArea type="text" placeholder="Event description" onChange={handleDescriptionChange} value={description} />
				</InputContainer>
			</InputWrapper>
			{/*  */}
			<InputWrapper>
				<Label>Venue*:</Label>
				<InputContainer>
					<TextInput
						disabled={!isPrivate ? 'disabled' : ''}
						readOnly={!isPrivate ? 'readonly' : ''}
						type="text"
						placeholder="Event venue"
						onChange={handleVenueChange}
						value={venue}
					/>
				</InputContainer>
			</InputWrapper>
			{/*  */}
			<InputWrapper>
				<Label>Start Time*:</Label>
				<InputContainer>
					<DateTimeInput
						type="datetime-local"
						min="2022-05-21T12:00"
						max="2022-05-31T12:00"
						step="300"
						onChange={handleStartChange}
						value={startTime}
					/>
				</InputContainer>
			</InputWrapper>
			{/*  */}
			<InputWrapper>
				<Label>End Time*:</Label>
				<InputContainer>
					<DateTimeInput
						type="datetime-local"
						min="2022-05-21T12:00"
						max="2022-05-31T12:00"
						step="300"
						onChange={handleEndChange}
						value={endTime}
					/>
				</InputContainer>
			</InputWrapper>
			{/*  */}
			<InputWrapper>
				<Label>URL:</Label>
				<InputContainer>
					<TextInput type="text" placeholder="URL with event info (e.g. https://starwars.com)" onChange={handleUrlChange} value={url} />
				</InputContainer>
			</InputWrapper>
			{/*  */}
			<InputWrapper>
				<Label>Physical Address:</Label>
				<InputContainer>
					<TextArea type="textarea" placeholder="Address of the venue" onChange={handleAddressChange} value={address} />
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
						value={imageUrl}
					/>
				</InputContainer>
			</InputWrapper>
			{/*  */}
			<ButtonWrapper>
				<Button as="button" disabled={!!error} onClick={handleSubmit}>
					Save Event
				</Button>
				<Button as="button" onClick={handleReset}>
					Clear Form
				</Button>
			</ButtonWrapper>
			{/*  */}
			<div>{userEvents && Object.values(userEvents).map(e => <EventListItem event={e} key={e.id} onEdit={handleEdit} forceOpen />)}</div>
		</Wrapper>
	)
}

export default memo(UserEventForm)
