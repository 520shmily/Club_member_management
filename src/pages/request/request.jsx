import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './request.scss'

export default class Request extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '我的通知'
  }

  render () {
    return (
      <View className='request'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
