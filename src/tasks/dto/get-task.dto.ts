export class GetTaskDto {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly points: number;
    readonly isDone: boolean;
}