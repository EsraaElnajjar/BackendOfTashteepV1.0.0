import { Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signin')
  async signIn(
    @Body('userName') userName: string,
    @Body('password') password: string
  ) {
    const result = await this.authService.signIn(userName, password);
    return result;  // يرجع الرسالة والدور معاً
  }

  @Post('users')
  async addUser(@Body() userData: any) {
    return await this.authService.addUser(userData);
  }


  // ==================== Get All Users ====================
  @Get('users')
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

  // ==================== Edit User ====================
  @Put('users/:id')
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: any
  ) {
    return await this.authService.editUser(id, updateData);
  }

  // ==================== Delete User ====================
  @Delete('users/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.authService.deleteUser(id);
  }
}
