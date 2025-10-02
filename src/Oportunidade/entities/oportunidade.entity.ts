import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Cliente } from '../../Cliente/entities/cliente.entity';
import { Usuario } from '../../Usuario/entities/usuario.entity';

@Entity('oportunidades')
export class Oportunidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  titulo: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ default: false })
  status: boolean;

  @ManyToOne(() => Cliente, (cliente) => cliente.oportunidades)
  cliente: Cliente;

  @CreateDateColumn()
  data: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.oportunidades)
  usuario: Usuario;
}
