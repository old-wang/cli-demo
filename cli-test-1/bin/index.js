#!/usr/bin/env node

console.log('demo-1 start')

const lib = require('@wangyao1994/cli-test-2')
console.log('lib', lib.add(1, 2))

// 注册cli-test-1 init
// argv：执行命令行包含的参数
const argv = require('process').argv
console.log('argv', argv)

const command = argv[2]

const options = argv.slice(3)
if(options.length > 1) {
  let [option, param] = options
  option = option.replace('--', '')

  if(command) {
    if(lib[command]) {
      lib[command]({ option, param })
    } else {
      console.log('无效命令！')
    }
  } else {
    console.log('请输入命令')
  }
}


// 实现解析 --version 和 init --name
if(command.startsWith('--') || command.startsWith('-')) {
  const globalOption = command.replace(/--|-/g, '')
  console.log('globalOption', globalOption)
  if(globalOption === 'version' || globalOption === 'V') {
    console.log('version', '1.0.0')
  }
}
