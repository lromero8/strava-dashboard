import type { Activity } from "$lib/activity";

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