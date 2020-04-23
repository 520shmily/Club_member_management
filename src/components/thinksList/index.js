import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'


export default class ThinksList extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { nickname, activitythinks } = this.props;
    return (
      <View className="thinksList">
        <Text className="nickname">{activitythinks == null ? '' : nickname}</Text>
        <Text className="activitythinks">{activitythinks == null ? '' : activitythinks}</Text>
      </View>
    )
  }
}