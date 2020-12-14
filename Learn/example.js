var Crawler = require('crawler')

var c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  // 在每个请求处理完毕后将调用此回调函数
  callback: function (error, res, done) {
    if (error) {
      console.log(error)
    } else {
      var $ = res.$
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      // $ 默认为 Cheerio 解析器
      // 它是jQuery核心的精简实现，可以按照jQuery选择器语法快速提取DOM元素
      console.log($('title').text())
    }
    done()
  }
})

// Queue just one URL, with default callback
// c.queue('http://www.baidu.com')
// 将一个URL加入请求队列，并使用默认回调函数

// Queue a list of URLs
// 将多个URL加入请求队列
// c.queue(['http://www.baidu.com/', 'http://www.yahoo.com'])

// Queue URLs with custom callbacks & parameters
// 对单个URL使用特定的处理参数并指定单独的回调函数
c.queue([
  {
    uri: 'https://www.jianshu.com/',
    jQuery: true,

    // The global callback won't be called
    // 全局回调不会被调用
    callback: function (error, res, done) {
      if (error) {
        console.log(error)
      } else {
        var $ = res.$
        // console.log('Grabbed', res.body.length, 'bytes')
        // console.log(res.statusCode)
        console.log(res.options)

        console.log($('#sign_in').text())
      }
      done()
    }
  }
])

// Queue some HTML code directly without grabbing (mostly for tests)
// 将一段HTML代码加入请求队列，即不通过抓取，直接交由回调函数处理（可用于单元测试）
// c.queue([
//   {
//     html: '<p>This is a <strong>test</strong></p>'
//   }
// ])
