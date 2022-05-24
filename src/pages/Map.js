import { memo } from 'react'
import { styled } from 'linaria/react'

import hallSvg from 'components/maps/hall.svg'
import level1Svg from 'components/maps/level1.svg'
import level2Svg from 'components/maps/level2.svg'
import level3Svg from 'components/maps/level3.svg'
import { NonScrollWrapper, PageTitle } from 'components/styles'

const MapImage = styled.img`
	width: 100%;
	background: var(--text);
	padding: 8px;
	border-radius: 8px;
`

const Map = () => {
	return (
		<NonScrollWrapper>
			<PageTitle>Exhibition Hall</PageTitle>
			<MapImage alt="Exhibition Hall Map" src={hallSvg} />
			<PageTitle>Level 1</PageTitle>
			<MapImage alt="Level 1 Map" src={level1Svg} />
			<PageTitle>Level 2</PageTitle>
			<MapImage alt="Level 2 Map" src={level2Svg} />
			<PageTitle>Level 3</PageTitle>
			<MapImage alt="Level 3 Map" src={level3Svg} />
		</NonScrollWrapper>
	)
}

export default memo(Map)
