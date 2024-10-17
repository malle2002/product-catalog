
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [UsersService,UserSubscriber],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
