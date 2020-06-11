import { EventEmitter } from 'events'
import { randomString } from './util'
import { ITransArg } from '../interface'

class Events extends EventEmitter {
    [key: string]: Function
}

const events = new Events()

const addEventFn = (eventFnName: string, cmd: string, fn: (args: ITransArg) => Promise<any>): void => {
    events[eventFnName](cmd, (args: ITransArg) => {
        const transId = args.transId
        fn(args)
            .then(res => {
                events.emit(`${cmd}-${transId}-result`, {
                    res
                })
            })
            .catch(err => {
                events.emit(`${cmd}-${transId}-result`, {
                    err
                })
            })
    })
}

const on = (cmd: string, fn: (args: ITransArg) => Promise<any>): void => {
    addEventFn('addListener', cmd, fn)
}
const once = (cmd: string, fn: (args: ITransArg) => Promise<any>): void => {
    addEventFn('once', cmd, fn)
}
const off = (cmd: string): void => {
    events.removeAllListeners(cmd)
}
const emit = (cmd: string, args: ITransArg): Promise<any> => {
    return new Promise((resolve, reject) => {
        const transId = randomString(8, 'Aa#')
        events.once(`${cmd}-${transId}-result`, ({
            res,
            err
        }) => {
            if (err) {
                return reject(err)
            }
            resolve(res)
        })
        args.transId = transId
        events.emit(cmd, args)
    })
}

export {
    on,
    once,
    off,
    emit
}
