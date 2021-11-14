import { writable } from 'svelte/store';
import { browser } from '$app/env';

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