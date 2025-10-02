
import { UsuarioService } from './../service/usuario.service';
 import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Usuario } from '../entities/usuario.entity';


 @Controller('usuarios')
 @UsePipes(ValidationPipe)
export class UsuarioController {

       constructor(private readonly usuarioService: UsuarioService) {} 
       @Get()
       findAll() {
         return this.usuarioService.findAll();  
       }

       @Post()
         create(@Body() userData: Partial<Usuario>) {  // Aceita qualquer Partial<User>
           return this.usuarioService.create(userData);  // Sem validação auto
         }

       @Get(':id')
       findOne(@Param('id', ParseIntPipe) id: number) {
         return this.usuarioService.findOne(id);
       }

       @Patch(':id')
      update(@Param('id', ParseIntPipe) id: number, @Body() updateData: any) {
       return this.usuarioService.update(id, updateData); 
     }

       @Delete(':id')
       remove(@Param('id', ParseIntPipe) id: number) {
         return this.usuarioService.remove(id);
       }
}