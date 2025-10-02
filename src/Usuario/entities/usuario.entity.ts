import { Column, Entity, PrimaryGeneratedColumn,} from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator"

@Entity({name: 'tb_usuario'})
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @Column({length: 255, nullable: false})
  nome: string

  @IsEmail()
  @IsNotEmpty()
  @Column({length: 255, nullable: false})
  email: string

  @IsNotEmpty()
  @Column({length: 50, nullable: false})
  senha: string

  @Column({length: 5000})
  foto: string

  @IsNotEmpty()
  @Column({length: 100, nullable: false})
  cargo:

}
