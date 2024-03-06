import { VITE_STRAVA_ACCESS_TOKEN } from '$env/static/private';

interface Stats {
    recent_run_totals: string,
    all_run_totals: string,
    recent_swim_totals: string,
    biggest_ride_distance: number,
    ytd_swim_totals: string,
    all_swim_totals: string,
    recent_ride_totals: {
        distance: number,
        achievement_count: number,
        count: number,
        elapsed_time: number,
        elevation_gain: number,
        moving_time: number
    },
    biggest_climb_elevation_gain: number,
    ytd_ride_totals: string,
    all_ride_totals: string,
    ytd_run_totals: string
}
export async function load() {
    try {
        const key = import.meta.env.VITE_STRAVA_ACCESS_TOKEN;
        const response = await fetch('https://strava.com/api/v3/athletes/17975433/activities?access_token=' + key);
        const json = await response.json();
        return {  data: json };
    } catch (error) {
        console.log(error);
    }
}
