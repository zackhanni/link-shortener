import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { generateSlug } from './slug';
import { Prisma } from '@prisma/client';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLinkDto) {
    const slug = dto.customSlug ?? generateSlug();
    try {
      return await this.prisma.link.create({
        data: { slug, originalUrl: dto.originalUrl },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new Error('Slug already exists');
      }
      throw e;
    }
  }

  async findBySlugAndIncrement(slug: string) {
    try {
      return await this.prisma.link.update({
        where: { slug },
        data: { clickCount: { increment: 1 } },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException('Link not found');
      }
      throw e;
    }
  }
}
