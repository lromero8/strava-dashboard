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
        
        const clubResponse = await fetch('https://www.strava.com/api/v3/clubs/1227124/activities?access_token=' + reAuthJson.access_token);
        const clubActivities = await clubResponse.json();
        return { activities, clubActivities };

    } catch (error) {
        console.log(error);
    }
}
