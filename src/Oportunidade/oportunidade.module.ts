import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oportunidade } from './entities/oportunidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oportunidade])],
  providers: [],
  controllers: [],
  exports: [],
})
export class OportunidadeModule { }
