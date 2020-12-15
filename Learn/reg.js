const fs = require('fs')
const path = require('path')

// 从配置文件获取关键词
const keywords = fs
  .readFileSync(path.resolve(__dirname, './keywords.txt'), 'utf8')
  .replace(/\s/g, '')
  .split(',')
console.log('keywords:', keywords)
let matchStr = ''
keywords.forEach((value, index) => {
  if (index === keywords.length - 1) {
    matchStr += `${value}`
  } else matchStr += `${value}|`
})

var reg = new RegExp(`${matchStr}`, 'g')
console.log(reg)
