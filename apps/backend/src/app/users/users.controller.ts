import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto, UpdateUsersStatusDto } from './dto/update-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Req() req: Request, @Res() res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    const { users, totalPages } = this.usersService.getUsers(page);
    res.status(200).json({ users, totalPages });
  }
  //   @Get()
  //   getUsers(@Query() page: number): UsersDto[] {
  //     return this.usersService.getUsers(page);
  //   }

  @Get('/:id')
  getUserById(@Param('id') id: string, @Res() res: Response) {
    const response = this.usersService.getUserById(id);

    res
      .status(response.status)
      .json(
        response.status === 404
          ? { message: 'User not found' }
          : { user: response.user }
      );
  }

  @Post('/create')
  createUser(@Req() req: Request, @Res() res: Response) {
    const response = this.usersService.createUser(req.body as CreateUsersDto);
    res.status(response.status).json({ message: response.message });
  }
  //   @Post('/create')
  //   createUser(@Body() user: CreateUsersDto) {
  //     return this.usersService.createUser(user);
  //   }

  @Put('/:id/update')
  updateUser(@Req() req: Request, @Res() res: Response) {
    const response = this.usersService.updateUser(
      req.params.id,
      req.body as UpdateUsersDto
    );
    res.status(response.status).json({ message: response.message });
  }
  //   @Put('/:id/update')
  //   updateUser(@Param('id') id: string, @Body() user: UpdateUsersDto) {
  //     return this.usersService.updateUser(id, user);
  //   }

  @Patch('/:id/update-status')
  updateUserStatus(@Req() req: Request, @Res() res: Response) {
    const response = this.usersService.updateUserStatus(
      req.params.id,
      req.body as UpdateUsersStatusDto
    );
    res.status(response.status).json({ message: response.message });
  }
  //   @Patch('/:id/update-status')
  //   updateUserStatus(
  //     @Param('id') id: string,
  //     @Body() userStatus: UpdateUsersStatusDto
  //   ) {
  //     return this.usersService.updateUserStatus(id, userStatus);
  //   }

  @Delete('/:id/delete')
  deleteUser(@Req() req: Request, @Res() res: Response) {
    const response = this.usersService.deleteUser(req.params.id);
    res.status(response.status).json({ message: response.message });
  }
  //   @Delete('/:id/delete')
  //   deleteUser(@Param('id') id: string) {
  //     return this.usersService.deleteUser(id);
  //   }
}
