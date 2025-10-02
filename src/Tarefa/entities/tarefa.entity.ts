
//Implementação futura
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from "typeorm";
// import { IsNotEmpty } from "class-validator";
// import { Cliente } from "../../cliente/entities/cliente.entity";
// import { Usuario } from "../../usuario/entities/usuario.entity";

// @Entity({ name: "tb_tarefas "})
// export class Tarefa {

//     @PrimaryGeneratedColumn()
//     id: number

//     @IsNotEmpty()
//     @Column({ length: 100, nullable: false })
//     tipo: string

//     @IsNotEmpty()
//     @Column({ length: 1000, nullable: false })
//     descricao: string

//     @UpdateDateColumn()
//     data: Date

//     @IsNotEmpty()
//     @ManyToOne(() => Cliente, (cliente) => cliente.tarefas, {onDelete: 'CASCADE'})
//     cliente: Cliente

//     @IsNotEmpty()
//     @ManyToOne(() => Usuario, (usuario) => usuario.tarefas, {onDelete: 'CASCADE'})
//     usuario: Usuario
// }
