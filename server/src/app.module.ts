import { Module, DynamicModule, Type } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/UserController';
import * as mdb from './common/mdb'
import { UserModule } from './modules/user'

const modulesImports: Array<Type<any> | DynamicModule> = [
  UserModule
]

@Module({
  imports: [...modulesImports],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {
  constructor () {
    mdb.init()
  }
}
