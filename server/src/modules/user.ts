import { Module } from '@nestjs/common'
import { UserController } from '../controller/UserController'
import { UserService } from '../services/user'

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
