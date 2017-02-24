/**
 * Created by xinhui on 17/2/24.
 */
// 如果配置变多了 特别复杂了 可以放到其他文件中

const settings = {
    LOG_LEVEL: 'debug',
    ROBOT_DB: '',

    SCKEY: "SCU3520T4b3e8b858e984f3ab0b0f609ad04abce583e3f42c4079",
    SEED: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
};

const _settings = {
    local: {
        ROBOT_DB: "mongodb://localhost:27017/robot"
    },
    dev: {},

    prod: {}
};
let env = process.env.NODE_ENV || 'local';

(<any>Object).assign(settings, _settings[env]);

Object.seal(settings);

export default settings;
