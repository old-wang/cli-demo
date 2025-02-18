#!/usr/bin/env node

// 参考lerna源码
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const dedent = require('dedent')

const argv = hideBin(process.argv)
console.log('argv', argv)

const cli = yargs(argv)

cli
  .usage('使用：yargs-test <command> [option]')
  .demandCommand(1, '至少需要一个参数')
  // 错误命令提示
  .strict()
  // 错误命令补全提示
  .recommendCommands()
  // 用于自定义一些错误信息
  .fail((err) => {
    console.log('err:', err)
  })
  .alias('h', 'help')
  .alias('v', 'version')
  // 打印命令行样式
  .wrap(cli.terminalWidth())
  .epilogue(dedent(`页脚
    结束了`))
  .options({
    debug: {
      type: 'boolean',
      describe: 'debug模式',
      alias: 'd'
    }
  })
  .group(['debug'], '开发环境：')
  .command('init [name]', '初始化项目', (yargs) => {
    yargs.option('name', {
      type: 'string',
      describe: '项目名称',
      alias: 'n'
    })
  }, (argv) => {
    console.log('command argv:', argv)
  })
  .command({
    command: 'list',
    describe: '查看列表',
    builder: (yargs) => {},
    handler: (argv) => {}
  })
  .parse()