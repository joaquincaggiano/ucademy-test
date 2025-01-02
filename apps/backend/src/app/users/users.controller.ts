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
    const { users, totalPages, totalUsers } = this.usersService.getUsers(page || 1);
    return { users, totalPages, totalUsers };
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    const response = this.usersService.getUserById(id);

    if (response.status !== 200) {
      return { message: 'User not found' };
    }

    return { user: response.user };
  }

  @Post('/create')
  createUser(@Body() body: CreateUsersDto) {
    const response = this.usersService.createUser(body);

    return {
      status: response.status,
      message: response.message,
    };
  }

  @Put('/:id/update')
  updateUser(@Param('id') id: string, @Body() body: UpdateUsersDto) {
    const response = this.usersService.updateUser(id, body);

    return {
      status: response.status,
      message: response.message,
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
  deleteUser(@Param('id') id: string) {
    const response = this.usersService.deleteUser(id);

    return {
      status: response.status,
      message: response.message,
    };
  }
}
