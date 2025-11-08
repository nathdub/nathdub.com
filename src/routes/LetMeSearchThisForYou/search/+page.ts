import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const showcase = url.searchParams.get('showcase');
	const searchText = url.searchParams.get('q') || '';

	return {
		showcase: showcase !== null,
		searchText
	};
};
