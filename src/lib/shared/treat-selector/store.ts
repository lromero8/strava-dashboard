import { writable } from "svelte/store";

export const selectedTreatIndexStore = writable<number>(0);
