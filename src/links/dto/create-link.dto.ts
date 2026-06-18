import { IsUrl, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  @Length(1, 2048)
  originalUrl: string;

  @IsString()
  @Length(3, 30)
  @Matches(/^[A-Za-z0-9_-]+$/)
  @IsOptional()
  customSlug?: string;
}
