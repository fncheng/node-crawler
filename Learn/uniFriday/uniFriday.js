const { default: axios } = require('axios')
const querystring = require('querystring')
const conf = require('./uniFriConf')

const { unigoodsid, uniamount, unibeginTime, headers } = conf

const data = querystring.stringify({
  reqsn: '',
  reqtime: new Date().getTime(),
  cliver: '',
  reqdata: `{"goodsId": "${unigoodsid}",    "payWay": "03",    "amount": "${uniamount}",    "saleTypes": "C",    "points": 0,    "beginTime": ${unibeginTime},    "imei": "",    "sourceChannel": "955000300",    "proFlag": "",    "scene": "",    "promoterCode": "",    "oneid": "",    "twoid": "",    "threeid": "",    "maxcash": "",    "floortype": "undefined",    "launchId": ""  }`,
})

const config = {
  method: 'post',
  url: 'https://m.client.10010.com/welfare-mall-front/mobile/api/bj2402/v1',
  headers: headers,
  data: data,
}
// 查询商品信息
function getProductList() {
  axios
    .get(
      'https://m.client.10010.com/welfare-mall-front-activity/mobile/activity/get619Activity/v1?whetherFriday=YES',
      { headers: headers }
    )
    .then((res) => {
      const { status, resdata } = res.data
      if (status === 'success') {
        resdata.tabList[0].goodList
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
// 下单
function placeOrder() {
  axios(config)
    .then((res) => {
      console.log(res.data)
      if (res.data.msg == '此商品已抢光,下次早点来哦') {
        return
      } else {
        setTimeout(() => {
          placeOrder()
        }, 3000)
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

// function main() {
//   try {
//     placeOrder()
//   } catch (error) {
//     throw error
//   }
// }

// let interval
// // 立即执行一次
// placeOrder()
// clearInterval(interval)
// interval = setInterval(main, 200)
placeOrder()
