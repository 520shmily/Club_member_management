import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import isSignOff from '../../pages/club/timg.jpeg'
import { AtButton } from 'taro-ui'


export default class ActivityList extends Component {
  constructor(props) {
    super(props)
  }
  
  render () {
    const { signIn, signOff, pinglun, huodong, zhuangtai } = this.props;
    return (
      <View className='myActivityList' >
        <View className="activityTitleItem">
          <Text className="activityTitle">{huodong}</Text>
          <Text className="activityTips">{zhuangtai}</Text>
        </View>
        <View className="myActivityContent">
          <View>
            <Text className="textItem">是否签到：</Text>
            <Text className="spanItem">{signIn}</Text>
            <Text className="textItem">是否签退：</Text>
            <Text className="spanItem">{signOff}</Text>
          </View>
          <View className="thinksfenge"> 
            <Text className="textItem">评论：</Text>
            <Text className="TextItemThinks">{pinglun === null ? '空' : pinglun}</Text>
          </View>
        </View>
      </View>
    )
  }
}