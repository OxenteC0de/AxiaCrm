import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './Cliente/entities/cliente.entity';
import { Oportunidade } from './Oportunidade/entities/oportunidade.entity';
import { UsuarioModule } from './Usuario/usuario.module';
import { OportunidadeModule } from './Oportunidade/oportunidade.module';
import { ClienteModule } from './Cliente/cliente.module';
import { Usuario } from './Usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0905',
      database: 'db_axiacrm',
      entities: [Oportunidade, Cliente, Usuario],
      synchronize: true,
    }),
    UsuarioModule,
    OportunidadeModule,
    ClienteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
