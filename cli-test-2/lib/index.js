const add = (a, b) => {
  return a + b
}

const init = ({ option, param }) => {
  console.log('开始init', option, param)
}

module.exports = { add, init }