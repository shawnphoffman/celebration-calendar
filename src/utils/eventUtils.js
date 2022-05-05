export const processApiData = data => {
	if (!data || !data.schedules) return

	const venueSet = new Set()

	const events = data.schedules.map(s => {
		venueSet.add(s.location)
		return transformEvent(s)
	})

	return {
		venues: Array.from(venueSet).sort((a, b) => (a.replace('The ', '') > b.replace('The ', '') ? 1 : -1)),
		events,
	}
}

const convertDate = rawDate => {
	return new Date(rawDate.replace(' ', 'T')).toISOString()
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
		color: colorMap[rawEvent.location.replace('The ', '')] ?? undefined,
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
