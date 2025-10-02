import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
    ) { }

     async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.find();

    }

    async findById(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({
            where: {
                id
            }
        });

        if (!cliente)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        return cliente;
    } 
    
    async findByEmail(email: string): Promise<Cliente[]> {
        return await this.clienteRepository.findOne({
            where: { email: ILike('%${email}%')}
        })
    }

    async create (cliente: Cliente): Promise<Cliente> {
        return await this.clienteRepository.save(cliente);
    }

    async update(cliente: Cliente): Promise<Cliente>{
        await this.findById(cliente.id);

        const buscaCliente = await this.findByEmail(cliente.email);

        if (buscaCliente && buscaCliente.id !== cliente.id) {
            throw new HttpException('Cliente já Cadastrado!', HttpStatus.BAD_REQUEST);
        }
        return await this.clienteRepository.save(cliente);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.clienteRepository.delete(id)
    
    }


}