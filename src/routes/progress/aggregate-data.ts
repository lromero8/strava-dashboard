import type { Activity } from '$lib/activity';

export type AggregationType = 'Daily'|'Weekly';

interface TrendDataPoint {
    x: string;
    y: number;
}

interface AggregatedData {
    week: string;
    month: string;
    count: number;
    distance: number;
    time: number;
}

export function aggregateData(calendarActivities: Activity[], selectedAggregationType: AggregationType): TrendDataPoint[] {
    if (selectedAggregationType === 'Weekly') {
        return aggregateWeekly(calendarActivities);
    } else {
        return aggregateDaily(calendarActivities);
    }
}

function aggregateWeekly(activities: Activity[]): TrendDataPoint[] {
    const weeklyAggregatedData = aggregateByWeek(activities);
    return weeklyAggregatedData.map(week => ({
        x: week.month,
        y: week.count
    }));
}

function aggregateDaily(activities: Activity[]): TrendDataPoint[] {
    return activities.map(activity => ({
        x: formatToShortDate(activity.start_date),
        y: convertMetersToKilometers(activity.distance)
    }));
}

type WeekNumber = string;

function aggregateByWeek(activities: Activity[]): AggregatedData[] {
    const weeks: Record<WeekNumber, AggregatedData> = {};

    activities.forEach(activity => {
        const date = new Date(activity.start_date);
        const weekNumber = getWeekNumber(date);
        const month = formatToShortDate(date);

        if (!weeks[weekNumber]) {
            weeks[weekNumber] = createEmptyAggregatedData(weekNumber, month);
        }

        updateAggregatedData(weeks[weekNumber], activity);
    });

    return Object.values(weeks);
}

function createEmptyAggregatedData(week: string, month: string): AggregatedData {
    return {
        week,
        month,
        count: 0,
        distance: 0,
        time: 0,
    };
}

function updateAggregatedData(aggregatedData: AggregatedData, activity: Activity) {
    aggregatedData.count += 1;
    aggregatedData.distance += activity.distance;
    aggregatedData.time += activity.moving_time;
}

function getWeekNumber(date: Date): string {
    const year = date.getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);
    const daysSinceFirstDay = Math.floor((date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((daysSinceFirstDay + firstDayOfYear.getDay()) / 7);
    return `${year}-${weekNumber.toString().padStart(2, '0')}`;
}

function formatToShortDate(date: Date | string): string {
    const options = {
        year: 'numeric' as const,
        month: 'short' as const,
        day: 'numeric' as const
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

function convertMetersToKilometers(meters: number): number {
    return meters / 1000;
}
