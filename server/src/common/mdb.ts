import {
    MongoClient,
    MongoError,
    Db,
    Collection,
    Cursor,
    ObjectId
} from 'mongodb'
import settings from '../../settings.json'
import { DB, EVENTS } from '../constants'
import { emit } from './events'

let conn: { cli: MongoClient | null, db: Db | null } = {
    cli: null,
    db: null
}

let cli: MongoClient | null = null

const getCli = (): Promise<MongoClient> => new Promise((resolve, reject) => {
    const str = settings.mongo
    MongoClient.connect(str, { useNewUrlParser: true, poolSize: 30, useUnifiedTopology: true }, (err: MongoError, cli: MongoClient) => {
        if (err) {
            return reject(err)
        }
        resolve(cli)
    })
})

const init = async () => {
    cli = await getCli()
    conn = { 
        cli,
        db: cli.db(DB)
    }

    console.log('DB connected.')
    emit(EVENTS.DB_CONNECTED, {})
}

const getCol = (col: string) => {
    if (conn.db) {
        return conn.db.collection(col)
    }
    return null
}

const createCol = (db: string, col: string) => {
    if (!cli) {
        return null
    }
    return cli.db(db).createCollection(col)
}

const createDbCol = (db: string, col: string) => {
    if (!cli) {
        return null
    }
    return cli.db(db).createCollection(col)
}

/**
 * @description skip limit 分页
 * @param collection
 * @param size 每一页的数量
 * @param query 查询条件
 * @param sort { time: value } vlaue: -1 升序； 1 降序
 */
const findSortSkipLimit = async (
    colName: string,
    params: any
): Promise<any> => {
    const col: Collection = getCol(colName) as Collection
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const query: any = params.query
    const totalList: Cursor<any> = col.find(query)
    const total: number = await totalList.count()
    const skip = (page - 1) * pageSize
    let data: Array<any> = []
    const cursor: Cursor<any> = await totalList.skip(Number(skip)).limit(Number(pageSize)).sort(params.sort)
    data = await cursor.toArray()
    const currentTotal = data.length
    const res: any = {
        total,
        pageSize,
        currentTotal,
        page,
        data
    }
    return res
}

const deleteOneById: any = async (colName: string, _id: string): Promise<any> => {
    const col: Collection = getCol(colName) as Collection
    const id = new ObjectId(_id || undefined)
    return await col.deleteOne({_id: id})
}

const deleteManyById: any = async (colName: string, _ids: string[]): Promise<any> => {
    const col: Collection = getCol(colName) as Collection
    const ids: ObjectId[] = _ids.map((_id: string) => new ObjectId(_id))
    return await col.deleteMany({ _id: { '$in': [ ...ids ] } })
}

const setById: any = async (colName: string, _id: string | undefined, data: any): Promise<any> => {
    const col: Collection = getCol(colName) as Collection
    if (data._id) {
      delete data._id
    }
    const id = new ObjectId(_id || undefined)
    await col.updateOne({ _id: id }, { $set: data }, { upsert: true })
    return id
}

const getById: any = async (colName: string, _id: string | undefined, data: any): Promise<any> => {
    const col: Collection = getCol(colName) as Collection
    const id = new ObjectId(_id || undefined)
    return await col.findOne({ _id: id })
}

export {
    init,
    getCol,
    createCol,
    getCli,
    createDbCol,
    findSortSkipLimit,
    deleteOneById,
    setById,
    getById,
    deleteManyById
}
