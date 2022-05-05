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
		venues: Array.from(venueSet).sort((a, b) => (a.replace('The ', '') > b.replace('The ', '') ? 1 : -1)),
		events,
	}
}

export const colorMap = {
	'209A': '#FF8C00',
	'Celebration Stage': '#ffab00',
	"Collector's Stage": '#ffd600',
	'Fan Stage': '#aeea00',
	'Galaxy Stage': '#00c853',
	'Podcast Stage': '#00bfa5',
	'Saber Guild Performance Stage': '#00b8d4',
	'Star Wars Celebration LIVE': '#0091ea',
	'Star Wars Kids Classroom': '#304ffe',
	'Star Wars Kids Stage': '#6200ea',
	'STEAM Classroom': '#aa00ff',
	'Twin Suns Stage': '#c51162',
	'University Stage': '#d50000',
}

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
		color: colorMap[rawEvent.location.replace('The ', '')] ?? '#FFF',
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
