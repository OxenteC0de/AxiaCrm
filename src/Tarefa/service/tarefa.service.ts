import { ClienteService } from './../../Cliente/service/cliente.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Tarefa } from "../entities/tarefa.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class TarefaService {
    constructor(
    @InjectRepository(Tarefa)
    private tarefaRepository: Repository<Tarefa>,
    private clienteService: ClienteService,
  ) {}

  async findAll(): Promise<Tarefa[]> {
    return await this.tarefaRepository.find({
        relations:{
                usuario: true,
                cliente: true
            }
    });
  }

    async findById(id: number): Promise<Tarefa> {
        const tarefa = await this.tarefaRepository.findOne({
            where: { id },
            relations:{
                usuario: true,
                cliente: true
            }
        });

        if (!tarefa) {
            throw new HttpException('tarefa não encontrada!', HttpStatus.NOT_FOUND);
        }
        return tarefa;
    }


    async findAllByTipo(tipo: string): Promise<Tarefa[]> {
        return await this.tarefaRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`)
            },
            relations:{
                usuario: true,
                cliente: true
            }
        });
    }
    async create(tarefa: Tarefa): Promise<Tarefa> {
        await this.clienteService.findById(tarefa.cliente.id);
        return await this.tarefaRepository.save(tarefa);
    }

    async update(tarefa: Tarefa): Promise<Tarefa> {
        await this.findById(tarefa.id);
        await this.clienteService.findById(tarefa.cliente.id);  
        return await this.tarefaRepository.save(tarefa);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.tarefaRepository.delete(id)
    }
  
}