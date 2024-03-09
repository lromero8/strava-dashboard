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

        const response = await fetch('https://www.strava.com/api/v3/athlete/activities?access_token=' + reAuthJson.access_token);
        const activities = await response.json();
        return { activities };

    } catch (error) {
        console.log(error);
    }
}
