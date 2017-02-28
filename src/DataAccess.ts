/**
 * Created by xinhui on 17/2/24.
 */
import * as mongoose from 'mongoose';
import Settings from './Settings';
import log from "./utils/Logger";

class DataAccess {
    static _mongooseInstance: any;
    static _mongooseConnection: mongoose.Connection;
    static _mongooseConnectionOptions: mongoose.ConnectionOptions;

    constructor() {
        DataAccess.connect();
    }
    static connect(): mongoose.Connection {
        (<any>mongoose).Promise = global.Promise;
        if (this._mongooseInstance) return this._mongooseInstance;

        this._mongooseConnection = mongoose.connection;
        this._mongooseConnection.once('open', () => {
            log.info("connect to mongo db");
        });
        this._mongooseConnectionOptions = {server: {socketOptions: {keepAlive: 1}}};
        this._mongooseInstance = mongoose.connect(Settings.ROBOT_DB, this._mongooseConnectionOptions, err => {
            if (err) log.error(err);
            else log.info("connect success!")
        });
        return this._mongooseInstance;

    }
}

DataAccess.connect();

export default DataAccess;