import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user'
import { from } from 'rxjs';

@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) { }

  @Post('login')
  async login (@Body('ename') ename: string) {
    const res = await this.userService.login(ename)
    return Promise.resolve(res)
  }
}
