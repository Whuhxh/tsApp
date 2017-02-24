/**
 * Created by xinhui on 17/2/24.
 */
import * as mongoose from 'mongoose';
import Settings from './Settings';
import log from "./utils/Logger";

class DataAccess {
    static _mongooseInstance: any;
    static _mongooseConnection: mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }
    // TODO add connect options
    static connect(): mongoose.Connection {
        if (this._mongooseInstance) return this._mongooseInstance;

        this._mongooseConnection = mongoose.connection;
        this._mongooseConnection.once('open', () => {
            log.info("connect to mongo db");
        });
        this._mongooseInstance = mongoose.connect(Settings.ROBOT_DB);
        return this._mongooseInstance;

    }
}

DataAccess.connect();

export default DataAccess;