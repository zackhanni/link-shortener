import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Links (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.link.deleteMany({
      where: { originalUrl: { contains: 'example-e2e' } },
    });
    await app.close();
  });

  it('POST /links creates a link and returns a slug', async () => {
    const res = await request(app.getHttpServer())
      .post('/links')
      .send({ originalUrl: 'https://example-e2e.com/article' })
      .expect(201);

    expect(res.body).toMatchObject({
      originalUrl: 'https://example-e2e.com/article',
      clickCount: 0,
    });
    expect(typeof res.body.slug).toBe('string');
    expect(res.body.slug).toHaveLength(7);
  });

  it('POST /links rejects an invalid URL with 400', async () => {
    await request(app.getHttpServer())
      .post('/links')
      .send({ originalUrl: 'not-a-url' })
      .expect(400);
  });

  it('POST /links rejects unknown fields with 400', async () => {
    await request(app.getHttpServer())
      .post('/links')
      .send({ originalUrl: 'https://example-e2e.com/x', evil: 'payload' })
      .expect(400);
  });
});
