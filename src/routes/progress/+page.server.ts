import type { Activity } from '$lib/activity.js';

export async function load({ params, url }) {
    try {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };


        const body = JSON.stringify({
            client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
            client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
            refresh_token: import.meta.env.VITE_STRAVA_REFRESH_TOKEN,
            grant_type: 'refresh_token'
        });

        const reAuthorizeResponse = await fetch('https://www.strava.com/oauth/token', {
            method: 'post',
            headers: headers,
            body: body
        });

        const reAuthJson = await reAuthorizeResponse.json();
        console.log(reAuthJson);

        const currentMonth = new Date().getMonth();
        const month = Number(url.searchParams.get('month')) || currentMonth;
        const { firstDayTimestamp, lastDayTimestamp } = getTimeStamps(month);
        const perPage = 200;

        const calendarResponse = await fetch(`https://www.strava.com/api/v3/athlete/activities?before${lastDayTimestamp}&after=${firstDayTimestamp}&per_page=${perPage}&access_token=` + reAuthJson.access_token);
        const calendarActivities = await calendarResponse.json();

        return { calendarActivities };

    } catch (error) {
        console.log(error);
    }
}


function getTimeStamps(monthIndex: number) {

    const currentYear = new Date().getUTCFullYear();
    const currentMonthIndex = new Date().getMonth();

    const firstDayOfSelectedMonth = new Date(Date.UTC(currentYear, monthIndex, 1, 0, 0, 0));
    const lastDayOfCurrentMonth = new Date(Date.UTC(currentYear, currentMonthIndex, new Date().getDate(), 0, 0, 0));

    const firstDayTimestamp = Math.floor(firstDayOfSelectedMonth.getTime() / 1000);
    const lastDayTimestamp = Math.floor(lastDayOfCurrentMonth.getTime() / 1000);

    return { firstDayTimestamp, lastDayTimestamp };
    
}
