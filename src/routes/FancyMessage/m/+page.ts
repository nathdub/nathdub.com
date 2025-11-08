import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const text = url.searchParams.get('text') || 'text';
	const font = url.searchParams.get('font') || 'Arial';
	const color = '#' + (url.searchParams.get('color') || '000000');
	const size = parseInt(url.searchParams.get('size') || '30');
	const leftMargin = parseInt(url.searchParams.get('leftMargin') || '100');
	const topMargin = parseInt(url.searchParams.get('topMargin') || '0');
	const bold = url.searchParams.get('bold') || 'normal';
	const italic = url.searchParams.get('italic') || 'normal';
	const rainbow = (url.searchParams.get('rainbow') || 'false') === 'true';
	const animated = (url.searchParams.get('animated') || 'false') === 'true';

	return {
		text,
		font,
		color,
		size,
		leftMargin,
		topMargin,
		bold,
		italic,
		rainbow,
		animated
	};
};
