import { User } from './user.entity';
import { UsersService } from './users.service';
import { Controller, Get } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
