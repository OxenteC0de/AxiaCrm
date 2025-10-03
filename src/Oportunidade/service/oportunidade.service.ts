import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Oportunidade } from '../entities/oportunidade.entity';

@Injectable()
export class OportunidadeService {
  constructor(
    @InjectRepository(Oportunidade)
    private readonly oportunidadeRepository: Repository<Oportunidade>,
  ) {}

  async create(oportunidade: Partial<Oportunidade>): Promise<Oportunidade> {
    const newOportunidade = this.oportunidadeRepository.create(oportunidade);
    return this.oportunidadeRepository.save(newOportunidade);
  }

  async findAll(): Promise<Oportunidade[]> {
    return this.oportunidadeRepository.find({
      relations: ['cliente', 'usuario'],
    });
  }

  async findOne(id: number): Promise<Oportunidade> {
    const oportunidade = await this.oportunidadeRepository.findOne({
      where: { id },
      relations: ['cliente', 'usuario'],
    });
    if (!oportunidade) {
      throw new Error(`Oportunidade com id ${id} não encontrada`);
    }
    return oportunidade;
  }

  async update(
    id: number,
    updateData: Partial<Oportunidade>,
  ): Promise<Oportunidade> {
    await this.oportunidadeRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.oportunidadeRepository.delete(id);
  }

  //Metodo Adicionais para ativar e desativar
  async ativarStatus(id: number): Promise<Oportunidade> {
    const oportunidade = await this.findOne(id);

    // Verifica se já está ativo
    if (oportunidade.status === true) {
      throw new HttpException(
        'Oportunidade já está ativa',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Ativa o status
    oportunidade.status = true;
    return await this.oportunidadeRepository.save(oportunidade);
  }
  //Metodo para desativar
  async desativarStatus(id: number): Promise<Oportunidade> {
    const oportunidade = await this.findOne(id);

    if (oportunidade.status === false) {
      throw new HttpException(
        'Oportunidade já está inativa',
        HttpStatus.BAD_REQUEST,
      );
    }

    oportunidade.status = false;
    return await this.oportunidadeRepository.save(oportunidade);
  }
}
