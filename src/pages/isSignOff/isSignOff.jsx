import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './isSignOff.scss'
import { IsSignOff } from '../../components/isSignOff/index'

export default class Issignoff extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '会员之家'
  }

  render () {
    return (
      <View className='isSignOff'>
        <IsSignOff></IsSignOff>
      </View>
    )
  }
}
