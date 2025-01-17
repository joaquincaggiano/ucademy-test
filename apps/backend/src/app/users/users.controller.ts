import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto, UpdateUsersStatusDto } from './dto/update-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('page', ParseIntPipe) page: number) {
    const { users, totalPages, totalUsers } = this.usersService.getUsers(
      page || 1
    );
    return { users, totalPages, totalUsers };
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    const response = this.usersService.getUserById(id);

    return { user: response.user, status: response.status };
  }

  @Post('/create')
  async createUser(@Body() body: CreateUsersDto) {
    const response = await this.usersService.createUser(body);

    return {
      status: response.status,
      message: response.message,
      user: response.user,
    };
  }

  @Put('/:id/update')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUsersDto) {
    const response = await this.usersService.updateUser(id, body);

    return {
      status: response.status,
      message: response.message,
      user: response.user,
    };
  }

  @Patch('/:id/update-status')
  updateUserStatus(
    @Param('id') id: string,
    @Body() body: UpdateUsersStatusDto
  ) {
    const response = this.usersService.updateUserStatus(id, body);

    return {
      status: response.status,
      message: response.message,
    };
  }

  @Delete('/:id/delete')
  async deleteUser(@Param('id') id: string) {
    const response = await this.usersService.deleteUser(id);

    return {
      status: response.status,
      message: response.message,
    };
  }
}
