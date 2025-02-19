#!/usr/bin/env node

const _readline = (cb) => {
  const onKeyPress = (s) => {
    // 在命令行写入
    output.write(s)
    line += s

    switch(s) {
      // 回车
      case '\r':
        // 中断输入
        input.pause()
        cb(line)
        break;
    }
  }

  // 输入
  const input = process.stdin
  // 输出
  const output = process.stdout
  // 缓存输入数据
  let line = ''

  emitKeypressEvents(input)
  input.on('keypress', onKeyPress)

  // 为true时逐字监听，false时逐行监听
  input.setRawMode(true)
  input.resume()
}

const emitKeypressEvents = (stream) => {
  const onData = (chunk) => {
    // chunk是输入流，需要转字符串
    g.next(chunk.toString())
  }
  const g = emitKeys(stream)
  g.next()

  // 用于暂停执行
  stream.on('data', onData)
}

function* emitKeys(stream) {
  // 死循环，监听键盘点击事件
  while(true) {
    let ch = yield;
    // 广播keypress事件
    stream.emit('keypress', ch)
  }
}

_readline((s) => {
  console.log(`value: ${s}`)
})