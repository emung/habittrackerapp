export interface CreateHabitDto {
    name: string,
    description: string,
    category: string,
    target: number,
    targetPeriod: string,
    targetProgress: number
}