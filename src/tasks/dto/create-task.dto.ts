import { IsBoolean, IsInt, Length } from 'class-validator';

export class CreateTaskDto {
  @Length(5, 30)
  readonly title: string;

  @Length(5, 100)
  readonly description: string;

  @IsInt({ message: 'Custom message for this specific error' })
  readonly points: number;

  @IsBoolean()
  readonly isDone: boolean;
}
