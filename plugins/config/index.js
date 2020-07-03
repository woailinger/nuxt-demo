/**
 * 项目的配置文件
 *  dev: 开发版地址
 *  beta:测试版地址
 *  production:线上版地址
 */
import BaseConfig from './base'
const Config = require('./' + process.env.code_env)

console.log(process.env.code_env)
Object.assign(BaseConfig, Config.default)
export default BaseConfig
