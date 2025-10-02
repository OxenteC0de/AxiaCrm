import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "./entities/cliente.entity";
import { ClienteService } from "./service/cliente.service";
import { ClienteController } from "./controller/cliente.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClienteService],
  controllers: [ClienteController],
  exports: [],
})
export class ClienteModule {}

