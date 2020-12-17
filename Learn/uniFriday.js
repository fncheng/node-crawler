const { default: axios } = require('axios')
const querystring = require('querystring')

const data = querystring.stringify({
  reqsn: '0a330ecd-a966-4685-dc1c-cd8463a9031d',
  reqtime: 1607676280406,
  cliver: '',
  reqdata:
    '{"goodsId": "8a29ac8975a30dc50175c03fad831936",    "payWay": "03",    "amount": "10.00",    "saleTypes": "C",    "points": 0,    "beginTime": 1607673600000,    "imei": "",    "sourceChannel": "955000300",    "proFlag": "",    "scene": "",    "promoterCode": "",    "oneid": "",    "twoid": "",    "threeid": "",    "maxcash": "",    "floortype": "undefined",    "launchId": ""  }',
})
const config = {
  method: 'post',
  url: 'https://m.client.10010.com/welfare-mall-front/mobile/api/bj2402/v1',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148  unicom{version:iphone_c@7.0600}{systemVersion:dis}{yw_code:}',
    Cookie:
      'welfare-mall-front=c4cfd06fa6e4b4b7dd8781c40b1e6ff4; c_version=iphone_c@7.0600; channel=GGPD; city=031|310; cw_mutual=7064d003eb3c8934e769e430ecf3d64a367dbea9b72a5a58d55be9730d0e535d72281492d1f9eb867c3a67d8a01da51c02285c75241e7564cda3373f181b90d4; devicedId=A81C7292-311D-426D-A56D-D2706112D0F1; ecs_acc=JTYs27TZWqiANgTxEM/V7D2sJie+GL4Lujqdk5rLQaNmBzj5VxyK8d/eOL/QquJ+lhjdOFVrkTxCxtWv5C/DcDQrMlTtueN+H/VaobaO0KrxHPpM6GqjmhDHmyaRJ09T00vdNTsOVPrw/7UI9WW8NqLw1a+BYwtQnOApkeA7h1k=; ecs_token=eyJkYXRhIjoiNWVjMzc1MzNjZDhiYmJhZTEwYWQ1NDMzYjIyNDJkODc2M2Q4ZWU2M2U4ZjAxYTk5OGEzNTQ2NDcwMDFmNzI3NDA5ZWE4Mjk4YWU4MGNiYzMyNWRmZjAxYjg0YWFjNTRlMzMwYzg5MzE0MjE2Y2FhZjA2NjVlNzFhOTgzZGU4YTI5OTQzYWU5NGM2YjI5OGU5MjBhODQ1Zjk5OWU5YTMwNDMyM2NmMmJhMmQ1NDhjZTcwNjIxOTY5NWZmMTA0N2ZhIiwidmVyc2lvbiI6IjAwIn0=; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIxODYyMTE1NTI1NyIsInBybyI6IjAzMSIsImNpdHkiOiIzMTAiLCJpZCI6IjRiZTNkOGJmMjBjZmUxNDQ4Y2Q4YzExNGFiNWZlYjQ0In0.kjPox8AvbCZE4p-NO7OcuEhEVhOj0OViQYFQ4La5O6c; login_type=06; u_account=18621155257; ecs_acc=JTYs27TZWqiANgTxEM/V7D2sJie+GL4Lujqdk5rLQaNmBzj5VxyK8d/eOL/QquJ+lhjdOFVrkTxCxtWv5C/DcDQrMlTtueN+H/VaobaO0KrxHPpM6GqjmhDHmyaRJ09T00vdNTsOVPrw/7UI9WW8NqLw1a+BYwtQnOApkeA7h1k=; welfareroute=75af3944295867086384f2fae6e01459060ce2df; route=55f54410e8db5be50a8dbc21f26a6e18; mobileServiceAll=5af78e43942628ace4fe59e4a6342010; on_info=6e287cc855950ad0751dbd7f4ae6ffa1; clientid=31|310; UID=DPjexpGih1ukpb02EgLVfWSXFeUA3zm7',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: data,
}
function getRequest() {
  axios(config)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
}

try {
  getRequest()
} catch (error) {
  throw error
}
