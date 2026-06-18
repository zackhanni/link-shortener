import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LinksService } from './links/links.service';

@Controller()
export class AppController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const link = await this.linksService.findBySlugAndIncrement(slug);
    return res.redirect(302, link.originalUrl);
  }
}
