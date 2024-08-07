import type { ActivityType } from "$lib/activity";
import type { Treat } from "$lib/shared/treat-selector/treat";

export interface Goal {
    name: string;
    description: string;
    activityType: ActivityType;
    treat: Treat;
    value: number;
}

export interface GoalWithProgress extends Goal {
    current: number;
    toGo: number;
    progress: number;
}