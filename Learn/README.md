使用 crontab 来定时重启

```bash
0 08 * * * /usr/bin/node /home/cheng/Github/zk8/src/index.js > /dev/null 2>&1 #定时开启
20 0 * * * /usr/bin/killall node > /dev/null 2>&1	#定时关闭
```
