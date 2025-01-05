import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AwsModule } from '../aws/aws.module';
import { AwsController } from '../aws/aws.controller';
import { AwsService } from '../aws/aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AwsModule, ConfigModule.forRoot()],
  controllers: [UsersController, AwsController],
  providers: [UsersService, AwsService],
})
export class UsersModule {}
