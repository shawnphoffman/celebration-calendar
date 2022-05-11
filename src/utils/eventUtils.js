const convertDate = rawDate => {
	return new Date(rawDate.replace(' ', 'T')).toISOString()
}

const customEvents = [
	// {
	// 	id: 'custom-1',
	// 	summary: 'Test Event',
	// 	description: 'Test Description.',
	// 	venue: 'Test Venue',
	// 	timezoneStartAt: 'America/Los_Angeles',
	// 	startDate: new Date('2022-05-26T17:30:00'),
	// 	endDate: new Date('2022-05-26T18:30:00'),
	// 	startAt: convertDate(new Date('2022-05-26T17:30:00').toISOString()),
	// 	endAt: convertDate(new Date('2022-05-26T18:30:00').toISOString()),
	// 	color: '#FFF',
	// 	url: 'https://google.com',
	// },
]

export const processApiData = data => {
	if (!data || !data.schedules) return

	const venueSet = new Set()

	const events = data.schedules.map(s => {
		venueSet.add(s.location)
		return transformEvent(s)
	})

	customEvents.forEach(event => {
		events.push(event)
		venueSet.add(event.venue)
	})

	return {
		venues: Array.from(venueSet).sort((a, b) => (cleanVenueName(a) > cleanVenueName(b) ? 1 : -1)),
		events,
	}
}

const colorList = [
	'#FF8C00',
	'#ffab00',
	'#ffd600',
	'#aeea00',
	'#00c853',
	'#00bfa5',
	'#00b8d4',
	'#0091ea',
	'#304ffe',
	'#6200ea',
	'#aa00ff',
	'#c51162',
	'#d50000',
]
export const colorMap = {
	'209A': colorList[0],
	'Celebration LIVE': colorList[1],
	'Celebration Stage': colorList[2],
	'Fan Stage': colorList[3],
	'Galaxy Stage': colorList[4],
	'Kids Classroom': colorList[5],
	'Kids Stage': colorList[6],
	'Podcast Stage': colorList[7],
	'Saber Guild Stage': colorList[8],
	'STEAM Classroom': colorList[9],
	'Twin Suns Stage': colorList[10],
	'University Stage': colorList[11],
	"Collector's Stage": colorList[12],
	//
}

export const cleanVenueName = v => {
	return v.replace('The ', '').replace('Star Wars ', '').replace('Performance ', '')
}

export const dayName = ['Sunday', 'x', 'x', 'x', 'Thursday', 'Friday', 'Saturday']

export const dayColor = {
	[dayName[4]]: 'var(--day1)',
	[dayName[5]]: 'var(--day2)',
	[dayName[6]]: 'var(--day3)',
	[dayName[0]]: 'var(--day4)',
}

export const formatTime = time =>
	new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase().replace(' ', '')

const transformEvent = rawEvent => {
	return {
		id: rawEvent.id,
		timezoneStartAt: 'America/Los_Angeles',
		startDate: new Date(rawEvent.start_time.replace(' ', 'T')),
		endDate: new Date(rawEvent.end_time.replace(' ', 'T')),
		startAt: convertDate(rawEvent.start_time),
		endAt: convertDate(rawEvent.end_time),
		summary: decodeEntities(rawEvent.title),
		description: decodeEntities(rawEvent.description),
		venue: rawEvent.location,
		color: colorMap[cleanVenueName(rawEvent.location)] ?? '#FFF',
		url: `https://www.starwarscelebration.com/en-us/panels/panel-information.html?gtID=${rawEvent.id}`,
	}
}

function decodeEntities(encodedString) {
	var translate_re = /&(nbsp|amp|quot|lt|gt);/g
	var translate = {
		nbsp: ' ',
		amp: '&',
		quot: '"',
		lt: '<',
		gt: '>',
	}
	return encodedString
		.replace(translate_re, function (match, entity) {
			return translate[entity]
		})
		.replace(/&#(\d+);/gi, function (match, numStr) {
			var num = parseInt(numStr, 10)
			return String.fromCharCode(num)
		})
}
