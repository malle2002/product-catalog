
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOne(username:string): Promise<User | null> {
    return this.usersRepository.findOneBy( {username})
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User>{
    const user = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }
  
  async createMany(users: User[]) {
    await this.dataSource.transaction(async manager => {
      await manager.save(users[0]);
      await manager.save(users[1]);
  });
}
}
