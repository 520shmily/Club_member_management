import Taro, { Component } from '@tarojs/taro'
import { View, Text, Form, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '会员之家'
  }


  formSubmit = e => {
    console.log(e.detail.value)
  }

  handOnClick = () => {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  render () {
    return (
      <View className='index' onClick={this.handOnClick}>
        <Text className='indexbtn'>点击开始你的社团之旅吧～～</Text>
      </View>
    )
  }
}
