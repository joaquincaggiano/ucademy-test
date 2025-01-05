import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [UsersModule, AwsModule],
})
export class AppModule {}
