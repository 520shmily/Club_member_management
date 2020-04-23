import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import isSignOff from '../isSignOff/isSignOff.jpg'
import { AtButton } from 'taro-ui'


export default class IsSignOff extends Component {

  handleClick = () => {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  render () {
    return (
      <View className='isSignOff'>
        <Image
          src={isSignOff}
        />
        <Text className="tipMessage">登录后才能查看页面内容哦～</Text>
        <View className="signInBtn">
          <AtButton type='primary' size='small' circle onClick={this.handleClick} >登录</AtButton>
        </View>
      </View>
    )
  }
}