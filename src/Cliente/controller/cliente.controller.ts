import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ClienteService } from '../services/cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clienteService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cliente: Cliente
  ): Promise<Cliente> {
    return this.clienteService.update(id, cliente);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clienteService.delete(id);
  }
}
