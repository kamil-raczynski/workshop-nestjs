export class CreateTaskDto {
    readonly title: string;
    readonly description: string;
    readonly points: number;
    readonly isDone: boolean;
}