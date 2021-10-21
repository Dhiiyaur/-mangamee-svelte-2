import { writable } from 'svelte/store';

// export const dataChapter = writable({});

const itemName = 'dataChapter';
// const retrieved = localStorage.getItem(itemName)
const retrieved = () => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem(itemName);
	} else {
		return null;
	}
};

const parsed = JSON.parse(retrieved());
export const dataChapter = writable(parsed === null ? [] : parsed);

dataChapter.subscribe((value) => localStorage.setItem(itemName, JSON.stringify(value)));
