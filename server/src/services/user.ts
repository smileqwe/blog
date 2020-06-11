import { Injectable } from '@nestjs/common'
import { getCol, createDbCol } from '../common/mdb'

@Injectable()
export class UserService {
    async login (ename: string, password?: string) {
        const userCol = getCol('user')
        console.log(userCol)
        const user = await userCol?.findOne({ ename })
        userCol?.insertOne({ ename: 'ceshi' })
        console.log(user)
        return Promise.resolve(user)
    }


}
