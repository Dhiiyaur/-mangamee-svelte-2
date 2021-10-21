import { writable } from 'svelte/store';

// export const dataChapter = writable({});

const itemName = "dataChapter"
const retrieved = localStorage.getItem(itemName)
const parsed = JSON.parse(retrieved)
export const dataChapter = writable(parsed === null ? [] : parsed)

dataChapter.subscribe(value =>
  localStorage.setItem(itemName, JSON.stringify(value))
)