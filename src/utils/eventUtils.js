const convertDate = rawDate => {
	return new Date(rawDate.replace(' ', 'T')).toISOString()
}

const customEvents = [
	{
		id: 'steele-1',
		summary: 'Steele Wars Live Show',
		description: `TICKETED EVENT: Don't miss our Celebration Anaheim live show, erotic fan fiction and party! Always one of the funnest vibes of Celebration. Special Star Wars guests & the best fun ever.\n\n - Where: 440 South Anaheim Boulevard, Anaheim, California 92805\n - Doors: 7pm\n - Show: 8:30pm\n - Last Call: 11:59pm`,
		venue: ' After Hours',
		timezoneStartAt: 'America/Los_Angeles',
		startDate: new Date('2022-05-28T19:00:00'),
		endDate: new Date('2022-05-28T23:59:00'),
		startAt: convertDate(new Date('2022-05-28T19:00:00').toISOString()),
		endAt: convertDate(new Date('2022-05-28T23:59:00').toISOString()),
		color: 'var(--linkHover)',
		url: 'https://contentcontent.myshopify.com/products/anaheim-live-show-erotic-fan-fiction-party-ticket-1',
		address: '440 South Anaheim Boulevard, Anaheim, California 92805',
	},
	{
		id: 'd23-1',
		summary: 'D23 Galactic Disco Night',
		description: `TICKETED EVENT: This Galactic Disco Night Dance Party on Thursday, May 26, will feature cosmic boogie and funky beats with an epic DJ set from Grammy®-nominated artist Mayer Hawthorne. Party like an ecstatic Ewok with special photo backdrops, surprise character appearances, and more.`,
		venue: ' After Hours',
		timezoneStartAt: 'America/Los_Angeles',
		startDate: new Date('2022-05-26T20:00:00'),
		endDate: new Date('2022-05-26T23:00:00'),
		startAt: convertDate(new Date('2022-05-26T20:00:00').toISOString()),
		endAt: convertDate(new Date('2022-05-26T23:00:00').toISOString()),
		color: 'var(--linkHover)',
		url: 'https://d23.com/d23-event/d23-galactic-disco/',
		address: '400 Disney Way #337, Anaheim, CA 92802',
	},
	{
		id: 'show-1',
		summary: 'Exhibit Hall Hours',
		description: `Official exhibit hall hours. Jedi Master VIP tickets may access the Exhibit Hall at 9:30 AM`,
		venue: ' Exhibit Hall',
		timezoneStartAt: 'America/Los_Angeles',
		startDate: new Date('2022-05-26T10:00:00'),
		endDate: new Date('2022-05-26T19:00:00'),
		startAt: convertDate(new Date('2022-05-26T10:00:00').toISOString()),
		endAt: convertDate(new Date('2022-05-26T19:00:00').toISOString()),
		color: 'var(--green)',
		url: 'https://www.starwarscelebration.com/en-us/show-information.html',
	},
	{
		id: 'show-2',
		summary: 'Exhibit Hall Hours',
		description: `Official exhibit hall hours. Jedi Master VIP tickets may access the Exhibit Hall at 9:30 AM`,
		venue: ' Exhibit Hall',
		timezoneStartAt: 'America/Los_Angeles',
		startDate: new Date('2022-05-27T10:00:00'),
		endDate: new Date('2022-05-27T19:00:00'),
		startAt: convertDate(new Date('2022-05-27T10:00:00').toISOString()),
		endAt: convertDate(new Date('2022-05-27T19:00:00').toISOString()),
		color: 'var(--green)',
		url: 'https://www.starwarscelebration.com/en-us/show-information.html',
	},
	{
		id: 'show-3',
		summary: 'Exhibit Hall Hours',
		description: `Official exhibit hall hours. Jedi Master VIP tickets may access the Exhibit Hall at 9:30 AM`,
		venue: ' Exhibit Hall',
		timezoneStartAt: 'America/Los_Angeles',
		startDate: new Date('2022-05-28T10:00:00'),
		endDate: new Date('2022-05-28T17:00:00'),
		startAt: convertDate(new Date('2022-05-28T10:00:00').toISOString()),
		endAt: convertDate(new Date('2022-05-28T17:00:00').toISOString()),
		color: 'var(--green)',
		url: 'https://www.starwarscelebration.com/en-us/show-information.html',
	},
	{
		id: 'show-4',
		summary: 'Exhibit Hall Hours',
		description: `Official exhibit hall hours. Jedi Master VIP tickets may access the Exhibit Hall at 9:30 AM`,
		venue: ' Exhibit Hall',
		timezoneStartAt: 'America/Los_Angeles',
		startDate: new Date('2022-05-29T10:00:00'),
		endDate: new Date('2022-05-29T19:00:00'),
		startAt: convertDate(new Date('2022-05-29T10:00:00').toISOString()),
		endAt: convertDate(new Date('2022-05-29T19:00:00').toISOString()),
		color: 'var(--green)',
		url: 'https://www.starwarscelebration.com/en-us/show-information.html',
	},
	{
		id: 'bash-1',
		summary: 'The Bash SWCA 2022',
		description: `TICKETED EVENT (18+ Only): "One galaxy. One Goal." The Bash at Star Wars Celebration, on the evening of May 26th at the Anaheim Marriot, brings together the 501st Legion, Rebel Legion, Mandalorian Mercs, Droid Builders, Saber Guild, The Dark Empire, and Galactic Academy and tickets are now open to all!\n
		The ticket price of $110 includes all food and drink (both alcoholic/non-alcoholic), plus Lightspeed lane reservation to the Celebration show store — an awesome perk. Entertainment includes The Force Capacitors (aka Flux Capacitors), DJ Elliot, Darth Elvis, Atomic Blonde, and a special surprise guest too!`,
		venue: ' After Hours',
		timezoneStartAt: 'America/Los_Angeles',
		startDate: new Date('2022-05-26T20:00:00'),
		endDate: new Date('2022-05-27T00:00:00'),
		startAt: convertDate(new Date('2022-05-26T20:00:00').toISOString()),
		endAt: convertDate(new Date('2022-05-27T00:00:00').toISOString()),
		color: 'var(--linkHover)',
		url: 'https://www.showclix.com/event/swca2022thebash43tgv/listing',
		address: 'Platinum Ballroom - Anaheim Marriott 700 West Convention Way Anaheim, CA 92802',
	},
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

	const sorted = events.sort((a, b) => {
		const aStart = new Date(a.startDate)
		const bStart = new Date(b.startDate)
		const aEnd = new Date(a.endDate)
		const bEnd = new Date(b.endDate)
		return aStart > bStart ? 1 : aStart === bStart ? (aEnd > bEnd ? 1 : -1) : -1
	})

	return {
		venues: Array.from(venueSet).sort((a, b) => (cleanVenueName(a) > cleanVenueName(b) ? 1 : -1)),
		events: sorted,
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
	' After Hours': 'var(--linkHover)',
	' Exhibit Hall': 'var(--green)',

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
		color: colorMap[cleanVenueName(rawEvent.location)],
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
