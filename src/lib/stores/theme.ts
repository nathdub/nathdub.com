import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // true in browser, false during SSR, prevents problems when accessing for example localStorage and document during pre-render

// also referred in applyTheme()
export type Theme = 'light' | 'dark' | 'system' | 'matrix';
export const defaultTheme: Theme = 'system';

// Use writable store for cross-component state in .ts files
const themeStore = writable<Theme>(defaultTheme);

// Stores new theme in localStorage and updates theme store accordingly
export function setTheme(theme: Theme) {
	if (browser) {
		localStorage.setItem('theme', theme);
		applyTheme(theme);
	}
	themeStore.set(theme);
}

// Get stored current theme from localStorage and puts it in theme store
export function initTheme() {
	if (browser) {
		const stored = localStorage.getItem('theme') as Theme;
		const theme = stored || defaultTheme;
		
		// Store default theme in storage if non existent on first page load 
		if (!stored) {
			localStorage.setItem('theme', theme);
		}

		// Don't apply theme here since it's already applied in the head script
		// Just set the store value
		themeStore.set(theme);
	}
}

// Export the store for components to subscribe to
export const theme = themeStore;

// Adds a class .${theme}-theme in the document root element
function applyTheme(theme: Theme) {
	if (!browser) return;
	
	const root = document.documentElement;
	
	root.classList.remove('light-theme', 'dark-theme', 'system-theme', 'matrix-theme');
	
	if (theme === 'system') {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		root.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
	} else {
		root.classList.add(`${theme}-theme`);
	}
}

// Listen for system theme changes to update 
if (browser) {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		const storedTheme = localStorage.getItem('theme') as Theme;
		if (storedTheme === 'system' || !storedTheme) {
			applyTheme('system');
		}
	});
}