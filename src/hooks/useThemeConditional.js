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

	color: var(--text);
`

const light = css`
	--bg: #eee;
	--outline: #ddd;
	--outlineHover: #ccc;
	--text: #000;
	--link: #333;
	--linkAlt: #3e498c;
	--linkHover: #00b8d4;
	--linkActive: #304ffe;
	--heart: #ff1493;
	--download: #f71c22;
	--inactive: #333;
	--transparent: #0000;
	--inputBg: #fff;
	--inputBorder: #000;

	color: var(--text);
`

const themeConditional = theme => {
	if (theme === 'light') return light
	return dark
}

export default themeConditional
