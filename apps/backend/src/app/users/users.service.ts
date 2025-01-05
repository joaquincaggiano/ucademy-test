import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UsersDto } from './dto/get-user.dto';
import { UpdateUsersDto, UpdateUsersStatusDto } from './dto/update-user.dto';
import { CreateUsersDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class UsersService {
  private users: UsersDto[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../../DB.json'), 'utf-8')
  ).filter((user: UsersDto) => user.id != null);

  constructor(private readonly awsService: AwsService) {}

  getUsers(page: number): {
    users: UsersDto[];
    totalPages: number;
    totalUsers: number;
  } {
    const totalPages = Math.ceil(this.users.length / 10);
    return {
      users: this.users.slice((page - 1) * 10, page * 10),
      totalPages,
      totalUsers: this.users.length,
    };
  }

  getUserById(id: string): { status: number; user: UsersDto | null } {
    const user = this.users.find((userDB) => userDB.id.$oid === id);

    if (!user) {
      return { status: 404, user: null };
    }

    return { status: 200, user };
  }

  async createUser(
    user: CreateUsersDto
  ): Promise<{ status: number; message: string; user?: UsersDto }> {
    const { base64String, ...userData } = user;
    const id = uuidv4();
    const userToFind = this.users.find(
      (userDB) => userDB.email === userData.email
    );

    if (userToFind) {
      return { status: 400, message: 'User already exists' };
    }

    let url = null;
    if (base64String) {
      url = await this.awsService.uploadFileToS3(
        `profile_image/${id}.png`,
        base64String
      );
    }

    const newUser = {
      id: { $oid: id },
      ...userData,
      isActive: true,
      image: url,
    };

    this.users.push(newUser);

    fs.writeFileSync(
      path.join(__dirname, '../../../DB.json'),
      JSON.stringify(this.users)
    );

    return { status: 200, message: 'User created successfully', user: newUser };
  }

  async updateUser(
    id: string,
    user: UpdateUsersDto
  ): Promise<{ status: number; message: string; user?: UsersDto }> {
    const index = this.users.findIndex((userDB) => userDB.id.$oid === id);

    if (index === -1) {
      return { status: 404, message: 'User not found', user: null };
    }

    const { base64String, ...userData } = user;

    let url = null;
    const key = `profile_image/${id}.png`;

    if (base64String) {
      if (this.users[index].image) {
        await this.awsService.deleteImage(key);
      }
      url = await this.awsService.uploadFileToS3(key, base64String);
    }

    this.users[index] = {
      id: { $oid: id },
      ...userData,
      isActive: this.users[index].isActive,
      image: url ? url : this.users[index].image,
    };
    fs.writeFileSync(
      path.join(__dirname, '../../../DB.json'),
      JSON.stringify(this.users)
    );

    return {
      status: 200,
      message: 'User updated successfully',
      user: this.users[index],
    };
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
