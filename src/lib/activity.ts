export type ActivityType = 'Run'|'Ride'|'Swim';

// Shape returned by the intervals.icu activities endpoint
export interface Activity {
  id: string,
  name: string,
  type: ActivityType,
  distance: number,
  moving_time: number,
  elapsed_time: number,
  total_elevation_gain: number,
  start_date: Date|string,
  start_date_local: Date|string,
  commute: boolean,
  average_speed: number,
  max_speed: number,
  average_cadence: number,
  average_heartrate: number,
  max_heartrate: number,
  calories: number
}
