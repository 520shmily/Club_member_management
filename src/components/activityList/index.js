import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import isSignOff from '../../pages/club/timg.jpeg'
import { AtButton } from 'taro-ui'


export default class ActivityList extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { activityTime, activityStopTime, activitySite, activityImg, clubActivity, isJion } = this.props;
    return (
      <View className='activityListCom' onClick={this.props.handleClick} >
        <Image
          mode='aspectFit'
          src={activityImg}
          className="activityImg at-article__img"
        />
        <View className="activityContent">
          <Text className="activityName">{clubActivity}</Text>
          <Text className="activitymessage">开始时间：{activityTime}</Text>
          <Text className="activitymessage">预计结束时间：{activityStopTime}</Text>
          <Text className="activitymessage">地点：{activitySite}</Text>
          <Text className="isJion">{isJion}</Text>
        </View>
      </View>
    )
  }
}