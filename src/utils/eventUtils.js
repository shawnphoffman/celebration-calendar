export const getVenues = raw => {
	const temp = new Set(raw.schedules.map(s => s.location))
	// console.log(temp)
	return temp
}

export const processEvents = raw => {
	const events = raw.schedules.map(transformEvent)
	// console.log({ events })
	return events
}

const convertDate = rawDate => {
	return new Date(rawDate.replace(' ', 'T')).toISOString()
}

export const colorMap = {
	'209A': '#FF8C00',
	'Saber Guild Performance Stage': '#ffab00',
	'Star Wars Celebration LIVE': '#ffd600',
	'STEAM Classroom': '#aeea00',
	'The Celebration Stage': '#00c853',
	'The Fan Stage': '#00bfa5',
	'The Galaxy Stage': '#00b8d4',
	'The Podcast Stage': '#0091ea',
	'The Star Wars Kids Classroom': '#304ffe',
	'The Star Wars Kids Stage': '#6200ea',
	'The Twin Suns Stage': '#aa00ff',
	'The University Stage': '#c51162',
	"The Collector's Stage": '#d50000',
}

const transformEvent = rawEvent => {
	return {
		id: rawEvent.id,
		// raw: {
		// 	start: rawEvent.start_time,
		// 	end: rawEvent.end_time,
		// },
		// timezoneStartAt: 'America/Los_Angeles',
		startAt: convertDate(rawEvent.start_time),
		endAt: convertDate(rawEvent.end_time),
		summary: decodeEntities(rawEvent.title),
		description: decodeEntities(rawEvent.description),
		venue: rawEvent.location,
		color: colorMap[rawEvent.location] ?? undefined,
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
