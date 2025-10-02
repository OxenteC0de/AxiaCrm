import { Usuario, UsuarioCargo } from '../entities/usuario.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(userData: Partial<Usuario>): Promise<Usuario> {
    // Validações
    if (!userData.email || !userData.email.includes('@')) {
      throw new BadRequestException('Email inválido');
    }
    if (!userData.senha || userData.senha.length < 8) {
      throw new BadRequestException('Senha deve ter pelo menos 8 caracteres');
    }
    if (!userData.nome || userData.nome.length < 3) {
      throw new BadRequestException('Nome deve ter pelo menos 3 caracteres');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(userData.senha, this.saltRounds);

    // Cria o usuário
    const user = this.usuarioRepository.create({
      ...userData,
      senha: hashedPassword,
    });

    return this.usuarioRepository.save(user);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Partial<Usuario>> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Remove senha do retorno
    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async update(id: number, updateData: any): Promise<Partial<Usuario>> {
    await this.findOne(id);

    // Validações
    if (updateData.email && !updateData.email.includes('@')) {
      throw new BadRequestException('Email inválido');
    }
    if (updateData.nome && updateData.nome.length < 3) {
      throw new BadRequestException('Nome deve ter pelo menos 3 caracteres');
    }

    const updateFields: Partial<Usuario> = {};

    // Adiciona campos se fornecidos
    if (updateData.email) updateFields.email = updateData.email;
    if (updateData.nome) updateFields.nome = updateData.nome;
    if (updateData.foto !== undefined) updateFields.foto = updateData.foto;
    if (updateData.cargo) updateFields.cargo = updateData.cargo as UsuarioCargo;

    // Se senha fornecida, valida e criptografa
    if (updateData.senha) {
      if (updateData.senha.length < 8) {
        throw new BadRequestException(
          'Nova senha deve ter pelo menos 8 caracteres',
        );
      }
      const hashedSenha = await bcrypt.hash(updateData.senha, this.saltRounds);
      updateFields.senha = hashedSenha;
    }

    // Verifica se há campos para atualizar
    if (Object.keys(updateFields).length === 0) {
      throw new BadRequestException(
        'Pelo menos um campo deve ser fornecido para atualização',
      );
    }

    await this.usuarioRepository.update(id, updateFields);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.usuarioRepository.delete(id);
  }

  async findByCargo(cargoString: string): Promise<Partial<Usuario>[]> {
    let cargo: UsuarioCargo;

    switch (cargoString.toLowerCase()) {
      case 'admin':
        cargo = UsuarioCargo.ADMIN;
        break;
      case 'usuario':
        cargo = UsuarioCargo.USUARIO;
        break;
      case 'moderador':
        cargo = UsuarioCargo.MODERADOR;
        break;
      default:
        throw new BadRequestException(
          `Cargo inválido: ${cargoString}. Use: admin, usuario, moderador`,
        );
    }

    const usuarios = await this.usuarioRepository.find({
      where: { cargo },
    });

    return usuarios.map((u) => {
      const { senha, ...semSenha } = u;
      return semSenha;
    });
  }
}
