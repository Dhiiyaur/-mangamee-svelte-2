import { writable } from 'svelte/store';
import { browser } from '$app/env';

const itemName = 'dataChapter';
const retrieved = () => {
	if (browser) {
		return localStorage.getItem(itemName);
	} else {
		return null;
	}
};

const parsed = JSON.parse(retrieved());
export const dataChapter = writable(parsed === null ? [] : parsed);

if (browser) {
	dataChapter.subscribe((value) => localStorage.setItem(itemName, JSON.stringify(value)));
}

const jwtStore = () => {
	if (browser) {
		return localStorage.getItem('jwt');
	} else {
		return null;
	}
};

const parsedJwt = JSON.parse(jwtStore());
export const jwt = writable(parsedJwt === null ? null : parsedJwt);

if (browser) {
	jwt.subscribe((value) => {
		localStorage.setItem('jwt', JSON.stringify(value));
	});
}


const userDataHistory = 'tempUserHistory';
const retrievedTempUserHistory = () => {
	if (browser) {
		return localStorage.getItem(userDataHistory);
	} else {
		return null;
	}
};

const parsedUserHistory = JSON.parse(retrievedTempUserHistory());
export const tempDataUserHistory = writable(parsed === null ? [] : parsedUserHistory);

if (browser) {
	tempDataUserHistory.subscribe((value) => localStorage.setItem(userDataHistory, JSON.stringify(value)));
}