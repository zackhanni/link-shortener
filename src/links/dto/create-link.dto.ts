import { IsUrl, IsOptional, IsString, Length } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  @Length(1, 2048)
  originalUrl: string;

  @IsString()
  @Length(3, 30)
  @IsOptional()
  customSlug?: string;
}
