import { writable } from 'svelte/store';
import { browser } from "$app/env";

// export const dataChapter = writable({});

const itemName = 'dataChapter';
// const retrieved = localStorage.getItem(itemName)
const retrieved = () => {
	if (browser) {
		return localStorage.getItem(itemName);
	} else {
		return null;
	}
};

const parsed = JSON.parse(retrieved());
export const dataChapter = writable(parsed === null ? [] : parsed);

if (browser){
  dataChapter.subscribe((value) => localStorage.setItem(itemName, JSON.stringify(value)));
}
