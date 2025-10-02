import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { TarefaController } from './controller/tarefa.controller';
import { TarefaService } from './service/tarefa.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa])],
  providers: [TarefaService],
  controllers: [TarefaController],
  exports: [],
})
export class TarefaModule {}