interface Athlete {
  id: number;
  resource_state: number;
}

interface Map {
  id: string;
  summary_polyline: null;
  resource_state: number;
}

export type ActivityType = 'Run'|'Ride'|'Swim';

export interface Activity {
  resource_state: number,
  athlete: Athlete,
  name: string,
  distance: number,
  moving_time: number,
  elapsed_time: number,
  total_elevation_gain: number,
  type: ActivityType,
  sport_type: string,
  workout_type: null,
  id: number,
  external_id: string,
  upload_id: number,
  start_date: Date|string,
  start_date_local: Date|string,
  timezone: string,
  utc_offset: number,
  start_latlng: null,
  end_latlng: null,
  location_city: null,
  location_state: null,
  location_country: string,
  achievement_count: number,
  kudos_count: number,
  comment_count: number,
  athlete_count: number,
  photo_count: number,
  map: Map,
  trainer: boolean,
  commute: boolean,
  manual: boolean,
  private: boolean,
  flagged: boolean,
  gear_id: string,
  from_accepted_tag: boolean,
  average_speed: number,
  max_speed: number,
  average_cadence: number,
  average_watts: number,
  weighted_average_watts: number,
  kilojoules: number,
  device_watts: boolean,
  has_heartrate: boolean,
  average_heartrate: number,
  max_heartrate: number,
  max_watts: number,
  pr_count: number,
  total_photo_count: number,
  has_kudoed: boolean,
  suffer_score: number
}

const WEIGHT = 79;
const RUNNING_MET = 8; // Approx value for running
const KOELSCH_CALORIES = 132; // 1 bottle of 330ml = 132cal and 1 glas of 200ml = 80cal


const today = new Date();
const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // Saturday

export const formatTime = (seconds: number) =>  {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const formattedTime = `${hours}h ${minutes}min`;
    return formattedTime;
};
const formatDate = (date: Date|string) => new Date(date);

export const getThisWeekRuns = (runs: Activity[]) => {
    return runs.filter(run => {
        const startDate = formatDate(run.start_date);
        return startDate >= firstDayOfWeek && startDate <= lastDayOfWeek;
    });
};

export const calculateTotalDistance = (runs: Activity[]) => {
    return runs.reduce((acc, curr) => acc + curr.distance, 0) / 1000;
};

export const calculateTotalMovingTime = (runs: Activity[]) => {
    return runs.reduce((acc, curr) => acc + curr.moving_time, 0);
};

export const calculateTotalAvgPace = (runs: Activity[], movingTime: number) => {
    return (movingTime / 60) / (runs.reduce((acc, curr) => acc + curr.distance, 0) / 1000);
};

export const calculateTotalCaloriesBurned = (movingTime: number) => {
    return RUNNING_MET * WEIGHT * (movingTime / 3600);
};

export const calculateTotalBeersEarned = (caloriesBurned: number) => {
    return caloriesBurned / KOELSCH_CALORIES;
};