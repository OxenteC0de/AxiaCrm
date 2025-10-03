import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { Oportunidade } from '../entities/oportunidade.entity';
import { OportunidadeService } from '../service/oportunidade.service';

@Controller('oportunidades')
export class OportunidadeController {
  constructor(private readonly oportunidadeService: OportunidadeService) {}

  @Post()
  create(@Body() oportunidade: Partial<Oportunidade>): Promise<Oportunidade> {
    return this.oportunidadeService.create(oportunidade);
  }

  @Get()
  findAll(): Promise<Oportunidade[]> {
    return this.oportunidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Oportunidade> {
    return this.oportunidadeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Oportunidade>,
  ): Promise<Oportunidade> {
    return this.oportunidadeService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.oportunidadeService.remove(id);
  }

  //Metodo adicional
  @Patch(':id/ativar')
  async ativarStatus(@Param('id') id: number) {
    return this.oportunidadeService.ativarStatus(id);
  }
  
  // Desativar status
  @Patch(':id/desativar')
  async desativarStatus(@Param('id') id: number): Promise<Oportunidade> {
    return this.oportunidadeService.desativarStatus(id);
  }
}
