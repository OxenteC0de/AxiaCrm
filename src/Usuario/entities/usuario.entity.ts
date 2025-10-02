import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Cliente } from '../../Cliente/entities/cliente.entity';
import { Oportunidade } from '../../Oportunidade/entities/oportunidade.entity';

export enum UsuarioCargo {
  ADMIN = 'admin',
  USUARIO = 'usuario',
  MODERADOR = 'moderador',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(3)
  nome: string;

  @Column()
  @MinLength(8)
  senha: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  foto?: string;

  @Column({
    type: 'enum',
    enum: UsuarioCargo,
    default: UsuarioCargo.USUARIO,
  })
  @IsEnum(UsuarioCargo)
  cargo: UsuarioCargo;

  @OneToMany(() => Cliente, (cliente) => cliente.usuario)
  clientes: Cliente[];

  @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.usuario)
  oportunidades: Oportunidade[];
}
