import {ObjectId} from 'mongodb'

export interface IUser {
  _id: ObjectId,
  ename: string,
  name: string,
  email?: string,
  phone?: string,
  createdAt: string,
  activated: boolean,
  activatedAt: string,
  activatedType: string
}

export interface ITransArg {
  transId?: string,
  [key: string]: any
}