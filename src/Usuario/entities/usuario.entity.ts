import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from "class-validator";


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

       @Column({ nullable: true })  // Opcional, para URL/path da foto
       @IsString()
       @IsOptional()
       foto?: string;

       @Column({
         type: 'enum',
         enum: UsuarioCargo,
         default: UsuarioCargo.USUARIO,  
       })
    
       cargo: UsuarioCargo;
     }
     