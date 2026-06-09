import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { LinksModule } from './links/links.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, LinksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
