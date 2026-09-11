import type { Activity } from '$lib/activity.js';
import { INTERVALS_API_KEY, INTERVALS_ATHLETE_ID } from '$env/static/private';

export async function load({ params, url }) {
    try {
        const currentMonth = new Date().getMonth();
        const month = Number(url.searchParams.get('month')) || currentMonth;
        const { oldest, newest } = getDateRange(month);

        const calendarResponse = await fetch(
            `https://intervals.icu/api/v1/athlete/${INTERVALS_ATHLETE_ID}/activities?oldest=${oldest}&newest=${newest}`,
            { headers: { 'Authorization': 'Basic ' + btoa(`API_KEY:${INTERVALS_API_KEY}`) } }
        );

        if (!calendarResponse.ok) {
            console.log('calendar activities status:', calendarResponse.status, await calendarResponse.text());
            return { calendarActivities: [] };
        }

        const calendarActivities = await calendarResponse.json();

        return { calendarActivities };

    }
    catch (error) {
        console.log(error);
        return { calendarActivities: [] };
    }
}


function getDateRange(monthIndex: number) {

    const currentYear = new Date().getUTCFullYear();
    const currentMonthIndex = new Date().getMonth();

    const firstDayOfSelectedMonth = new Date(Date.UTC(currentYear, monthIndex, 1, 0, 0, 0));
    const lastDayOfCurrentMonth = new Date(Date.UTC(currentYear, currentMonthIndex, new Date().getDate(), 0, 0, 0));

    const oldest = firstDayOfSelectedMonth.toISOString().slice(0, 10);
    const newest = lastDayOfCurrentMonth.toISOString().slice(0, 10);

    return { oldest, newest };
    
}
