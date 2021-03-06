var Crawler = require('crawler')
var axios = require('axios')
const fs = require('fs')
const path = require('path')

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
  },
})
// 从配置文件获取关键词
const keywords = fs
  .readFileSync(path.resolve(__dirname, './keywords.txt'), 'utf8')
  .replace(/\s|'/g, '')
  .split(',')
let matchStr = ''
keywords.forEach((value, index) => {
  if (index === keywords.length - 1) {
    matchStr += `${value}`
  } else matchStr += `${value}|`
})

var reg = new RegExp(`${matchStr}`, 'g')
// console.log(reg)

// Queue just one URL, with default callback
// c.queue('http://www.baidu.com')
// 将一个URL加入请求队列，并使用默认回调函数

// Queue a list of URLs
// 将多个URL加入请求队列
// c.queue(['http://www.baidu.com/', 'http://www.yahoo.com'])

// Queue URLs with custom callbacks & parameters
// 对单个URL使用特定的处理参数并指定单独的回调函数
var list = [
  {
    title: '027家乐福抢到了需要带sfz就行了吧抢购拥挤两次提交订单拥挤1次',
    isChecked: false,
  },
]
function getRequest() {
  // let list = []
  c.queue([
    {
      uri:
        'http://www.zuanke8.com/forum.php?mod=forumdisplay&fid=15&filter=author&orderby=dateline',
      jQuery: true,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
        Cookie:
          'ki1e_2132_saltkey=nDQje5JZ; ki1e_2132_lastvisit=1606707228; _uab_collina=160671083115435915056101; ki1e_2132_connect_is_bind=1; ki1e_2132_atarget=1; ki1e_2132_smile=1D1; ki1e_2132_nofavfid=1; ki1e_2132_auth=781bOWZpnxYkuWFBgs%2BYdNJy39pG2NVHL%2BfyZh3lbC%2BTMxjfGbRhvCNw0NN8%2FkMnQUzUQZoncEJkWfy623jgkQFxy60; ki1e_2132_lip=101.88.57.224%2C1607766858; ki1e_2132_clearUserdata=forum; ki1e_2132_connect_not_sync_t=1; ki1e_2132_pc_size_c=1cfaebd; ki1e_2132_creditnotice=0D0D0D0D0D0D0D0D0D884724; ki1e_2132_creditbase=0D1011D0D0D0D0D0D0D0; ki1e_2132_creditrule=%E5%8F%91%E8%A1%A8%E5%9B%9E%E5%A4%8D; ki1e_2132_connect_not_sync_feed=1; ki1e_2132_lastviewtime=884724%7C1609142303; ki1e_2132_viewid=tid_7722543; ki1e_2132_ulastactivity=1609211721%7C0; ki1e_2132_sendmail=1; ki1e_2132_forum_lastvisit=D_11_1608800751D_15_1609211766; ki1e_2132_lastcheckfeed=884724%7C1609211767; ki1e_2132_lastact=1609211767%09connect.php%09check',
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
          list = list.slice(-4)
          $('#threadlist #threadlisttableid')
            .children() // tbody
            .children() // tr
            .children('th')
            .children('a')
            .each((index, item) => {
              // 只添加前5条消息
              if (index > 4) {
                return
              }
              // if list 已存在对应标题，则不添加
              else {
                for (const v of list) {
                  // 已存在相同title，不添加，不存在就添加
                  if (v.title !== $(item).text()) {
                    list.push({ title: $(item).text(), isChecked: false })
                    break
                  }
                }
              }
            })
          // 如果使用console.log(item.innerText)会输出undefined ，此问题是箭头函数的this指向问题所导致，相关链接：https://stackoverflow.com/questions/46870941/cheerio-returns-undefined-when-calling-each-on-elements
        }
        console.log(list)
        for (const v of list) {
          if (v.isChecked === true) {
            continue
          } else {
            // isChecked === false 未读过的标题
            // 只匹配未读的内容，即 isChecked === false的情况
            // 匹配完将 isChecked=true
            v.isChecked = true
            let flag = reg.test(v.title)
            if (flag) {
              // 匹配到关键字，调用WxPusher
              // https://wxpusher.zjiecode.com/docs/#/?id=%e5%8f%91%e9%80%81%e6%b6%88%e6%81%af-1
              axios
                .post('http://wxpusher.zjiecode.com/api/send/message', {
                  appToken: 'AT_NelycJRWAxo3EF5DKykgNwA4jAY6Cm5p',
                  content: v.title,
                  // summary: v, //消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
                  contentType: 1, //内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown
                  // topicIds: [
                  //   //发送目标的topicId，是一个数组！！！，也就是群发，使用uids单发的时候， 可以不传。
                  // ],
                  uids: [
                    //发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个。
                    'UID_2UELgrdHiVR1Eq0cpKdG2th1pyAd',
                  ],
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
          }
          // else console.log('匹配失败')
        }
        done()
      },
    },
  ])
}
let interval
// 立即执行一次
getRequest()
clearInterval(interval)
interval = setInterval(getRequest, 2 * 60000) // 5min 执行一次
