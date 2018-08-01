# countdown

## 示例

[点击预览](https://panhezeng.github.io/countdown/)

示例代码目录 /example

## 说明

    构造函数参数
    /**
     * @param nowTime 当前时间戳，毫秒，默认 new Date().getTime()
     * @param endTime 结束时间戳，毫秒, 必填
     * @param onUpdate 倒计时更新回调函数，必填，回调传值，倒计时对象{days,hours,minutes,seconds}
     * @param onComplete 倒计时结束回调函数
     * @param autoStart 自动开始倒计时，默认true
     * @param update 初始化后立即执行一次更新回调函数，默认false
     * @param padStart 更新回调函数返回对象的时间是否补零，默认true
     * @param delay 触发更新回调函数的间隔时间，默认1000毫秒
     */
     实例方法
     init 和构造函数的参数一样，除了autoStart，此方法可以用于start后，不销毁计时器的情况下，改变倒计时依赖的参数
     start 开始倒计时，autoStart为false时，手动开始倒计时可以调用此方法
     update 更新倒计时方法，会执行onUpdate回调
     getObject 参数time，时间毫秒，必填，获得该时间的倒计时对象，{days,hours,minutes,seconds}
     clear 手动清除倒计时
     
     补零功能使用了String.prototype.padStart()，如需兼容老浏览器，自己添加polyfill

## 用法

`npm i @panhezeng/countdown -S`

```javascript
import Countdown from '@panhezeng/countdown'

const cdInstance = new Countdown({
        endTime: new Date().getTime() + 1081000,
        onUpdate: (data) => {
           console.log(`${data.hours}:${data.minutes}:${data.seconds}`)
        },
        onComplete: () => {
          console.log('cd complete')
        },
      })

```

## 编译

``` bash
# install dependencies
npm install

# 运行插件使用示例
npm run dev:example

# 编译插件
npm run build
```

