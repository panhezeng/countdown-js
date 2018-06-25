# countdown

[示例](https://panhezeng.github.io/countdown/)

## use

`npm i @panhezeng/countdown -S`

```javascript
import Countdown from '@panhezeng/countdown'

const cdInstance = new Countdown({
        nowTime: new Date().getTime(), endTime: new Date().getTime() + 1000000, onUpdate: (data) => {
          console.log(`${data.hours}:${data.minutes}:${data.seconds}`)
        },
        onComplete: () => {
          console.log('cd complete')
        },
      })
```



## 说明

    构造函数参数
    /**
     * @param nowTime 当前时间戳，毫秒
     * @param endTime 结束时间戳，毫秒, 必填
     * @param onUpdate 倒计时更新回调函数，必填，回调传值，倒计时对象{days,hours,minutes,seconds}
     * @param onComplete 倒计时结束回调函数
     * @param autoStart 自动开始倒计时，默认true
     * @param padStart 更新回调函数返回对象的时间是否补零，默认true
     * @param delay 触发更新回调函数的间隔时间，默认1000毫秒
     * @return {{start: start, clear: clear, getObject: getObject, updateTime: updateTime}}
     */
     实例方法
     start 手动开始倒计时，autoStart为false时，手动开始倒计时可以调用此方法
     clear 手动清除倒计时，参数callback，是否触发onComplete回调，默认true
     updateTime 初始化以后，用于更新当前和结束时间戳
     getObject 参数time，时间毫秒，必填，获得该时间的倒计时对象，{days,hours,minutes,seconds}
     
    

## 编译

``` bash
# install dependencies
npm install

# 运行插件使用示例
npm run dev:example

# 编译插件
npm run build
```

