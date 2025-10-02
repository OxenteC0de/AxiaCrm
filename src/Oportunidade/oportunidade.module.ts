import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oportunidade } from './entities/oportunidade.entity';
import { OportunidadeService } from './service/oportunidade.service';
import { OportunidadeController } from './controller/oportunidade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Oportunidade])],
  providers: [OportunidadeService],
  controllers: [OportunidadeController],
  exports: [OportunidadeService],
})
export class OportunidadeModule {}
