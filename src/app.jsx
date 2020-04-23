import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/login/login',
      'pages/activity/activity',
      'pages/club/club',
      'pages/myIndex/myIndex',
      'pages/activityDetail/activityDetail',
      'pages/request/request',
      'pages/myActivity/myActivity',
      'pages/evaluate/evaluate',
      'pages/message/message',
      'pages/suggest/suggest',
      'pages/isSignOff/isSignOff',
      'pages/updateMessage/updateMessage',
      
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
      "backgroundColor": "#fafafa",
      "borderStyle": "white",
      "selectedColor": "#25bae7",
      "color": "#666",
      "list": [
        {
          "pagePath": "pages/club/club",
          "iconPath": "static/images/clubOne.png",
          "selectedIconPath": "static/images/clubTwo.png",
          "text": "社团"
        },
        {
          "pagePath": "pages/activity/activity",
          "iconPath": "static/images/activityOne.png",
          "selectedIconPath": "static/images/activityTwo.png",
          "text": "活动"
        },
        {
          "pagePath": "pages/myIndex/myIndex",
          "iconPath": "static/images/myIndexOne.png",
          "selectedIconPath": "static/images/myIndexTwo.png",
          "text": "我的"
        }
      ]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
