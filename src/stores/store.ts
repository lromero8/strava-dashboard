import type { Activity } from '$lib/activity';
import { writable } from 'svelte/store';

export const activitiesStore = writable<Activity[]>();
export const calendarActivitiesStore = writable<Activity[]>();
