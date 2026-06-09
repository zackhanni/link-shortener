import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateLinkDto) {
    const slug = dto.customSlug ?? nanoid(7);
    return this.prisma.link.create({
      data: {
        slug,
        originalUrl: dto.originalUrl,
      },
    });
  }

  async findBySlugAndIncrement(slug: string) {
    const link = await this.prisma.link.update({
      where: { slug },
      data: { clickCount: { increment: 1 } },
    }).catch(() => null);

    if (!link) throw new NotFoundException('Link not found');
    return link;
  }
}
