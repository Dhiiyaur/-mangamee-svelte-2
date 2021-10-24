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
export const jwt = writable(jwtStore());

if (browser) {
	jwt.subscribe((value) => {
		localStorage.setItem('jwt', value);
	});
}


// const tempImageStore = () => {
// 	if (browser) {
// 		return localStorage.getItem('tempImage');
// 	} else {
// 		return null;
// 	}
// };
// export const tempImage = writable(jwtStore());

// if (browser) {
// 	tempImage.subscribe((value) => {
// 		localStorage.setItem('tempImage', value);
// 	});
// }



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