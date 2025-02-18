#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')

// 获取单例
// const { program } = commander

// 实例化
const program = new commander.Command()

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [option]')
  .version(pkg.version)
  .option('-d --debug', '调试模式', false)
  .option('-e --env <env>', '环境变量')

// command 注册命令
const init = program.command('init <name> [destination]')
init
  .description('初始化项目')
  .option('-f, --force', '强制')
  .action((name, destination) => {
    console.log('初始化', name, destination)
  })

// addCommand 注册命令
const service = new commander.Command('service')
service
  .command('start [port]')
  .action((port) => {
    console.log('start service', port)
  })
service
  .command('stop')
  .action(() => {
    console.log('stop service')
  })
program.addCommand(service)

// cli-commander install init 将指向 yargs-test init
program.command('install [name]', 'nstall pkg', {
  executableFile: 'yargs-test',
  // 默认命令，cli-commander === cli-commander install
  isDefault: true
})
.alias('i')

program
  .arguments('<cmd> [options]')
  .action((cmd, options) => {
    console.log('拦截错误命令：', cmd, options)
  })

program.parse()