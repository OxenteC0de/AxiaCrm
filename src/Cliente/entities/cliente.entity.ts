import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../Usuario/entities/cliente.entity';

export enum StatusContrato {
  PENDENTE = 'PENDENTE',
  ATIVO = 'ATIVO',
  CANCELADO = 'CANCELADO',
  CONCLUIDO = 'CONCLUIDO',
}
@Entity({ name: 'tb_cliente' })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  email: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  telefone: string;

  @Column({
    type: 'enum',
    enum: StatusContrato,
    default: StatusContrato.PENDENTE,
  })
  statusContrato: StatusContrato;

  @ManyToOne(() => Usuario, (usuario) => usuario.clientes)
  usuario: Usuario;
}
