import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  victoryValue: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  victoryOverLeaderValue: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  defeatValue: number;
}
