var Crawler = require('crawler')
var axios = require('axios')

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

const keywords = ['速度', '大水']
let matchStr = ''
keywords.forEach((item) => {
  matchStr += `${item}|`
})

var reg = new RegExp(`${matchStr}`, 'g')

// Queue just one URL, with default callback
// c.queue('http://www.baidu.com')
// 将一个URL加入请求队列，并使用默认回调函数

// Queue a list of URLs
// 将多个URL加入请求队列
// c.queue(['http://www.baidu.com/', 'http://www.yahoo.com'])

// Queue URLs with custom callbacks & parameters
// 对单个URL使用特定的处理参数并指定单独的回调函数
function getRequest() {
  let list = []
  c.queue([
    {
      uri:
        'http://www.zuanke8.com/forum.php?mod=forumdisplay&fid=15&filter=author&orderby=dateline',
      jQuery: true,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
        Cookie:
          'ki1e_2132_saltkey=Vb991SJy; ki1e_2132_lastvisit=1605257340; _uab_collina=160526094109000892844782; ki1e_2132_connect_is_bind=1; ki1e_2132_atarget=1; ki1e_2132_smile=1D1; ki1e_2132_auth=542flNTdKG080MzXqja1M9y43Xw9yP2ZO6TK%2Bo9A3uDIk1dsxmkYfSbKwt%2BNEAJEVHbnm2pczY9BN74QZ3jZ9xdX4yc; ki1e_2132_lip=112.65.61.22%2C1605664690; ki1e_2132_ulastactivity=1605668783%7C0; ki1e_2132_clearUserdata=forum; ki1e_2132_creditnotice=0D0D0D0D0D0D0D0D0D884724; ki1e_2132_creditbase=0D964D0D0D0D0D0D0D0; ki1e_2132_creditrule=%E5%8F%91%E8%A1%A8%E5%9B%9E%E5%A4%8D; ki1e_2132_connect_not_sync_t=1; ki1e_2132_connect_not_sync_feed=1; ki1e_2132_viewid=tid_7638478; ki1e_2132_forum_lastvisit=D_15_1605669450; ki1e_2132_lastcheckfeed=884724%7C1605669450; ki1e_2132_lastact=1605669450%09connect.php%09check'
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
          // console.log(res)
          // console.log(
          //   $('#threadlist #threadlisttableid')
          //     .children() // tbody
          //     .children() // tr
          //     .children('th')
          //     .children('a')
          //     .text()
          // )

          $('#threadlist #threadlisttableid')
            .children() // tbody
            .children() // tr
            .children('th')
            .children('a')
            .each((index, item) => {
              list.push($(item).text())
              // console.log($(item).text())
            })
          // 如果使用console.log(item.innerText)会输出undefined ，此问题是箭头函数的this指向问题所导致，相关链接：https://stackoverflow.com/questions/46870941/cheerio-returns-undefined-when-calling-each-on-elements
        }
        // console.log(list)
        list.forEach((v, i) => {
          let flag = reg.test(v)
          if (flag) {
            // 匹配到关键字，调用WxPusher
            // https://wxpusher.zjiecode.com/docs/#/?id=%e5%8f%91%e9%80%81%e6%b6%88%e6%81%af-1
            axios
              .post('http://wxpusher.zjiecode.com/api/send/message', {
                appToken: 'AT_NelycJRWAxo3EF5DKykgNwA4jAY6Cm5p',
                content: v,
                // summary: v, //消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
                contentType: 1, //内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown
                // topicIds: [
                //   //发送目标的topicId，是一个数组！！！，也就是群发，使用uids单发的时候， 可以不传。
                // ],
                uids: [
                  //发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个。
                  'UID_2UELgrdHiVR1Eq0cpKdG2th1pyAd'
                ]
                // url: 'http://wxpusher.zjiecode.com' //原文链接，可选参数
              })
              .then((res) => {
                if (res.code === 1000) {
                  console.log('发送成功')
                }
              })
              .catch((err) => {
                console.error(err)
              })
          }
          // else console.log('匹配失败')
        })
        done()
      }
    }
  ])
}

setInterval(getRequest, 5 * 60000) // 5min 执行一次
