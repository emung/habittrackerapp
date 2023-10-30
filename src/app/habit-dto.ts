export interface HabitDto {
    id: number,
    name: string,
    description: string,
    category: string,
    target: number | undefined,
    targetPeriod: string,
    targetProgress: number | undefined
}
