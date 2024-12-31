import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UsersDto } from './dto/get-user.dto';
import { UpdateUsersDto, UpdateUsersStatusDto } from './dto/update-user.dto';
import { CreateUsersDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: UsersDto[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../../DB.json'), 'utf-8')
  ).filter((user: UsersDto) => user.id != null);

  getUsers(page: number): { users: UsersDto[]; totalPages: number } {
    const totalPages = Math.ceil(this.users.length / 10);
    return {
      users: this.users.slice((page - 1) * 10, page * 10),
      totalPages,
    };
  }

  getUserById(id: string): { status: number; user: UsersDto | null } {
    const user = this.users.find((userDB) => userDB.id.$oid === id);

    if (!user) {
      return { status: 404, user: null };
    }

    return { status: 200, user };
  }

  createUser(user: CreateUsersDto): { status: number; message: string } {
    const id = uuidv4();
    const userToFind = this.users.find((userDB) => userDB.email === user.email);

    if (userToFind) {
      return { status: 400, message: 'User already exists' };
    }

    this.users.push({ id: { $oid: id }, ...user });
    fs.writeFileSync(
      path.join(__dirname, '../../../DB.json'),
      JSON.stringify(this.users)
    );
    return { status: 200, message: 'User created successfully' };
  }

  updateUser(
    id: string,
    user: UpdateUsersDto
  ): { status: number; message: string } {
    const index = this.users.findIndex((userDB) => userDB.id.$oid === id);

    if (index === -1) {
      return { status: 404, message: 'User not found' };
    }

    this.users[index] = {
      id: { $oid: id },
      ...user,
      isActive: this.users[index].isActive,
    };
    fs.writeFileSync(
      path.join(__dirname, '../../../DB.json'),
      JSON.stringify(this.users)
    );
    return { status: 200, message: 'User updated successfully' };
  }

  updateUserStatus(
    id: string,
    userStatus: UpdateUsersStatusDto
  ): { status: number; message: string } {
    const index = this.users.findIndex((user) => user.id.$oid === id);

    if (index === -1) {
      return { status: 404, message: 'User not found' };
    }

    this.users[index].isActive = userStatus.isActive;
    fs.writeFileSync(
      path.join(__dirname, '../../../DB.json'),
      JSON.stringify(this.users)
    );

    return { status: 200, message: 'User status updated successfully' };
  }

  deleteUser(id: string): { status: number; message: string } {
    const user = this.users.find((user) => user.id.$oid === id);

    if (!user) {
      return { status: 404, message: 'User not found' };
    }

    this.users = this.users.filter((user) => user.id.$oid !== id);
    fs.writeFileSync(
      path.join(__dirname, '../../../DB.json'),
      JSON.stringify(this.users)
    );
    return { status: 200, message: 'User deleted successfully' };
  }
}
