import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      relations: ['usuario', 'oportunidades'],
    });
  }

  async findById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['usuario', 'oportunidades'],
    });

    if (!cliente) {
      throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);
    }

    return cliente;
  }

  async findByEmail(email: string): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      where: { email: ILike(`%${email}%`) },
    });
  }

  async create(cliente: Cliente): Promise<Cliente> {
    // Verifica se já existe cliente com o email
    const clienteExistente = await this.clienteRepository.findOne({
      where: { email: cliente.email },
    });

    if (clienteExistente) {
      throw new HttpException(
        'Cliente já cadastrado com este email!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.clienteRepository.save(cliente);
  }

  async update(cliente: Cliente): Promise<Cliente> {
    // Verifica se o cliente existe
    await this.findById(cliente.id);

    // Verifica se o email já está em uso por outro cliente
    const clienteComEmail = await this.clienteRepository.findOne({
      where: { email: cliente.email },
    });

    if (clienteComEmail && clienteComEmail.id !== cliente.id) {
      throw new HttpException(
        'Email já está em uso por outro cliente!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.clienteRepository.save(cliente);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.clienteRepository.delete(id);
  }
}
