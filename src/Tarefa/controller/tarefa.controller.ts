// Implementação futura

// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Param,
//   ParseIntPipe,
//   Post,
//   Put,
// } from '@nestjs/common';
// import { Tarefa } from '../entities/tarefa.entity';

// @Controller('/tarefas')
// export class TarefaController {
//   constructor(private readonly tarefaService: TarefaService) {}

//   @Get()
//   @HttpCode(HttpStatus.OK)
//   findAll(): Promise<Tarefa[]> {
//     return this.tarefaService.findAll();
//   }

//   @Get('/:id')
//   @HttpCode(HttpStatus.OK)
//   findById(@Param('id', ParseIntPipe) id: number): Promise<Tarefa> {
//     return this.tarefaService.findById(id);
//   }

//   @Get('cliente/:clienteId')
//   findByCliente(@Param('clienteId', ParseIntPipe) clienteId: number) {
//     return this.tarefaService.findByCliente(clienteId);
//   }

//   @Get('usuario/:usuarioId')
//   findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
//     return this.tarefaService.findByUsuario(usuarioId);
//   }

//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   create(@Body() tarefa: Tarefa): Promise<Tarefa> {
//     return this.tarefaService.create(tarefa);
//   }

//   @Put()
//   @HttpCode(HttpStatus.OK)
//   update(@Body() tarefa: Tarefa): Promise<Tarefa> {
//     return this.tarefaService.update(tarefa);
//   }

//   @Delete(':id')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   delete(@Param('id', ParseIntPipe) id: number) {
//     return this.tarefaService.remove(id);
//   }
// }
