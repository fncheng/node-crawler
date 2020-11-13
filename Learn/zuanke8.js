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
    uri:
      'http://www.zuanke8.com/forum.php?mod=forumdisplay&fid=15&filter=author&orderby=dateline',
    jQuery: true,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
      Cookie:
        '_uab_collina=160053114423154942782055; ki1e_2132_connect_is_bind=1; ki1e_2132_nofavfid=1; ki1e_2132_saltkey=s45aa225; ki1e_2132_lastvisit=1603682380; ki1e_2132_auth=c0589Db2nGdEam2JhVL3L1ljbAOEbD1K2ofsbc10Mze%2BZtZ9htOhpX%2Bs1pzBcsdks6WlxMLLiKJqSs89QlJwgYL5Rdg; ki1e_2132_lip=140.207.23.104%2C1603685990; ki1e_2132_atarget=1; ki1e_2132_home_diymode=1; ki1e_2132_clearUserdata=forum; ki1e_2132_creditnotice=0D0D0D0D0D0D0D0D0D884724; ki1e_2132_connect_not_sync_t=1; ki1e_2132_smile=8D1; timestamp=1604483869000; sign=D039E719A9E3FAF8BE667C33B576B52E; ki1e_2132_creditrule=%E5%8F%91%E8%A1%A8%E5%9B%9E%E5%A4%8D; ki1e_2132_creditbase=0D963D0D0D0D0D0D0D0; ki1e_2132_pc_size_c=0; ki1e_2132_viewid=tid_7625791; ki1e_2132_forum_lastvisit=D_11_1604369441D_15_1605259690; ki1e_2132_ulastactivity=1605259690%7C0; ki1e_2132_lastcheckfeed=884724%7C1605259690; ki1e_2132_lastact=1605259691%09home.php%09spacecp'
    },
    // The global callback won't be called
    // 全局回调不会被调用
    callback: function (error, res, done) {
      if (error) {
        console.log(error)
      } else {
        var $ = res.$
        // console.log('Grabbed', res.body.length, 'bytes')
        // console.log(res.statusCode)
        console.log(res.body)
      }
      done()
    }
  }
])
