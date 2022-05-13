import { css } from '@linaria/core'

const dark = css`
	--bg: #111;
	--outline: #1d1f26;
	--outlineHover: #18161e;
	--text: #fff;
	--link: #fff;
	--linkAlt: #a0a8d9;
	--linkHover: #00b8d4;
	--linkActive: #304ffe;
	--heart: #ff1493;
	--download: #ff540d;
	--inactive: #333;
	--transparent: #0000;
	--inputBg: #fff;
	--inputBorder: #000;
	--day1: #042940;
	--day2: #174001;
	--day3: #400a40;
	--day4: #40290a;
	--fallback: yellow;
	--green: #32de84;

	color: var(--text);
`

const light = css`
	--bg: #eee;
	--outline: #ddd;
	--outlineHover: #ccc;
	--text: #000;
	--link: #333;
	--linkAlt: #3e498c;
	--linkHover: #028da2;
	--linkActive: #304ffe;
	--heart: #fa48a7;
	--download: #be060c;
	--inactive: #333;
	--transparent: #0000;
	--inputBg: #fff;
	--inputBorder: #000;
	--day1: #97bfd7;
	--day2: #b2c8a6;
	--day3: #bbaabb;
	--day4: #c1aa8d;
	--fallback: yellow;
	--green: #32de84;

	color: var(--text);
`

const themeConditional = theme => {
	if (theme === 'light') return light
	return dark
}

export default themeConditional
