import { INTERVALS_API_KEY, INTERVALS_ATHLETE_ID } from '$env/static/private';

export async function load() {
    try {
        // intervals.icu requires oldest/newest bounds; use a trailing year for the dashboard
        const newest = new Date().toISOString().slice(0, 10);
        const oldest = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10);

        const response = await fetch(
            `https://intervals.icu/api/v1/athlete/${INTERVALS_ATHLETE_ID}/activities?oldest=${oldest}&newest=${newest}`,
            { headers: { 'Authorization': 'Basic ' + btoa(`API_KEY:${INTERVALS_API_KEY}`) } }
        );

        if (!response.ok) {
            console.log('activities status:', response.status, await response.text());
            return { activities: [] };
        }

        const activities = await response.json();
        return { activities };

    }
    catch (error) {
        console.log(error);
        return { activities: [] };
    }
}
